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

export async function installPlugin(pluginName: string, projectDir: string, options?: { projectName?: string }): Promise<InstallResult> {
  let pluginPath = join(process.cwd(), 'packages', 'plugins', pluginName);
  
  if (!existsSync(pluginPath)) {
    console.log(`[INSTALL] Local plugin "${pluginName}" not found. Checking remote registry...`);
    try {
      pluginPath = await PluginRegistry.downloadPlugin(pluginName);
    } catch (e: any) {
      throw new Error(`Plugin "${pluginName}" not found locally or in the remote registry: ${e.message}`);
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

  return {
    success: true,
    pluginName
  };
}
