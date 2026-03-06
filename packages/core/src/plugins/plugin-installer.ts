import fs from 'fs-extra';
const { copySync, readFileSync, writeFileSync, existsSync } = fs;
import { join } from 'path';
import { loadPlugin } from './plugin-loader';
import { globSync } from 'glob';

export interface InstallResult {
  success: boolean;
  pluginName: string;
}

import { PluginRegistry } from '../utils/plugin-registry';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getPluginsRoot() {
  const searchPaths = [
    // 1. Try relative to the current file (bundled distribution)
    join(__dirname, 'plugins'),
    join(__dirname, '..', 'plugins'),
    join(__dirname, '..', '..', 'plugins'),
    // 2. Try Node Modules resolution
    join(process.cwd(), 'node_modules', '@ahmadubaidillah', 'core', 'plugins'),
    // 3. Local development fallback
    join(process.cwd(), 'packages', 'plugins'),
  ];

  for (const p of searchPaths) {
    if (existsSync(p)) {
      // Basic validation: look for at least one core plugin
      if (existsSync(join(p, 'auth'))) return p;
    }
  }

  // 4. Aggressive Upward Search
  let current = __dirname;
  const root = '/';
  while (current !== root) {
    const p = join(current, 'plugins');
    if (existsSync(p) && existsSync(join(p, 'auth'))) {
      return p;
    }
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }

  return join(process.cwd(), 'packages', 'plugins');
}

export async function installPlugin(pluginName: string, projectDir: string, options?: { projectName?: string }): Promise<InstallResult> {
  // Aliases and normalization
  const aliases: Record<string, string> = {
    'payment': 'payments',
    'file-upload': 'file_upload',
    'file-uploads': 'file_upload',
    'github-action': 'github-actions',
    'deployment-vercel': 'deployment',
  };

  const normalizedName = aliases[pluginName] || pluginName;
  const pluginsRoot = getPluginsRoot();
  let pluginPath = join(pluginsRoot, normalizedName);
  
  if (!existsSync(pluginPath)) {
    console.log(`[INSTALL] Local plugin "${normalizedName}" not found. Checking remote registry...`);
    try {
      pluginPath = await PluginRegistry.downloadPlugin(normalizedName);
    } catch (e: any) {
      throw new Error(`Plugin "${normalizedName}" not found locally or in the remote registry: ${e.message}`);
    }
  }

  const config = loadPlugin(pluginPath);
  const pluginFilesDir = join(pluginPath, 'files');

  // 1. Copy plugin files to project
  if (existsSync(pluginFilesDir)) {
    copySync(pluginFilesDir, projectDir);
    
    // Perform variable replacement on the copied files if projectName is provided
    if (options && options.projectName) {
      const pluginFiles = globSync('**/*.{ts,js,json,tsx,html,md}', { cwd: pluginFilesDir });
      
      await Promise.all(pluginFiles.map(async (relativePath) => {
        const targetFile = join(projectDir, relativePath);
        if (existsSync(targetFile)) {
          const content = await fs.readFile(targetFile, 'utf8');
          const originalContent = content;

          let newContent = content.replace(/{{PROJECT_NAME}}/g, options.projectName!);
          newContent = newContent.replace(/{{SUCCESS_URL}}/g, 'http://localhost:3000/success');
          newContent = newContent.replace(/{{CANCEL_URL}}/g, 'http://localhost:3000/cancel');
          newContent = newContent.replace(/{{RETURN_URL}}/g, 'http://localhost:3000/billing');
          newContent = newContent.replace(/{{DOMAIN}}/g, 'localhost:3000');

          if (newContent !== originalContent) {
            await fs.writeFile(targetFile, newContent);
          }
        }
      }));
    }
  }

  // 2. Merge dependencies into target package.json
  const targetPkgPath = join(projectDir, 'package.json');
  if (existsSync(targetPkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(targetPkgPath, 'utf8'));
      
      pkg.dependencies = { 
        ...(pkg.dependencies || {}), 
        ...config.packageDependencies 
      };
      
      pkg.devDependencies = { 
        ...(pkg.devDependencies || {}), 
        ...config.packageDevDependencies 
      };

      writeFileSync(targetPkgPath, JSON.stringify(pkg, null, 2));
    } catch (e: any) {
      throw new Error(`Failed to parse target package.json during plugin installation: ${e.message}`);
    }
  }

  // 3. Automatic Route Injection (Registry)
  if (config.routeInfo) {
    const appPathTsx = join(projectDir, 'src', 'app.tsx');
    const appPathTs = join(projectDir, 'src', 'app.ts');
    const appPath = existsSync(appPathTsx) ? appPathTsx : (existsSync(appPathTs) ? appPathTs : null);

    if (appPath) {
      let appContent = readFileSync(appPath, 'utf8');
      
      // Add Import
      const importStmt = `import { ${config.routeInfo.exportName} } from '${config.routeInfo.importFile}';\n`;
      if (!appContent.includes(config.routeInfo.importFile)) {
        appContent = importStmt + appContent;
      }

      // Add Route under the appropriate injection point
      const isUI = config.routeInfo.type === 'ui';
      const targetInstance = isUI ? 'app' : 'api';
      const marker = isUI ? '// [PLUGIN_UI_INJECTION_POINT]' : '// [PLUGIN_ROUTES_INJECTION_POINT]';
      const injectionRegex = new RegExp(`${marker.replace('[', '\\[').replace(']', '\\]')}.*$`, 'm');
      
      const routeStmt = `${targetInstance}.route('${config.routeInfo.path}', ${config.routeInfo.exportName});\n`;
      
      if (!appContent.includes(routeStmt)) {
        if (injectionRegex.test(appContent)) {
          appContent = appContent.replace(injectionRegex, `${marker}\n${routeStmt}`);
        } else {
          // Fallback if marker is missing: add to end of file
          const fallbackInstance = appContent.includes('const api =') ? 'api' : 'app';
          appContent += `\n// Auto-injected route\n${fallbackInstance}.route('${config.routeInfo.path}', ${config.routeInfo.exportName});\n`;
        }
      }

      writeFileSync(appPath, appContent);
    }
  }

  return {
    success: true,
    pluginName
  };
}
