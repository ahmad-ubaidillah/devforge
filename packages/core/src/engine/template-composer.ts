import fs from 'fs-extra';
const { copySync, readFileSync, writeFileSync, existsSync } = fs;
import { join } from 'path';
import { globSync } from 'glob';

interface ComposerOptions {
  projectName: string;
  plugins: string[];
}

export function composeTemplate(templatePath: string, targetDir: string, options: ComposerOptions) {
  const filesDir = join(templatePath, 'files');

  // Copy all files from templates/files directory
  copySync(filesDir, targetDir);

  // Auto-create .env from .env.example
  const envExamplePath = join(targetDir, '.env.example');
  const envPath = join(targetDir, '.env');
  if (existsSync(envExamplePath) && !existsSync(envPath)) {
    copySync(envExamplePath, envPath);
  }

  // Apply variable replacements to specific entry files
  const entryFiles = globSync(join(targetDir, '**/*.{ts,js,json,tsx,html,md,env,env.example}'));
  
  entryFiles.forEach(file => {
    let content = readFileSync(file, 'utf8');
    
    // Replace placeholders like {{PROJECT_NAME}}
    content = content.replace(/{{PROJECT_NAME}}/g, options.projectName);
    
    writeFileSync(file, content);
  });
}
