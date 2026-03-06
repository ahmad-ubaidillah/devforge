import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { installPlugin } from '../../../core/src/plugins/plugin-installer';

export function registerAddCommand(program: Command) {
  program
    .command('add')
    .description('Add a plugin to the current project')
    .argument('<plugin>', 'Plugin name')
    .action(async (plugin) => {
      try {
        const targetDir = process.cwd();
        let localProjectName = 'my-app';
        
        try {
          const pkgPath = join(targetDir, 'package.json');
          if (existsSync(pkgPath)) {
            const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
            if (pkg.name) localProjectName = pkg.name;
          } else {
            localProjectName = process.cwd().split('/').pop() || 'my-app';
          }
        } catch (e) {
          // Fallback to folder name
          localProjectName = process.cwd().split('/').pop() || 'my-app';
        }

        const spinner = ora(`Installing plugin "${plugin}"...`).start();
        
        await installPlugin(plugin, targetDir, { projectName: localProjectName });
        
        spinner.succeed(chalk.green(`Plugin "${plugin}" installed successfully!`));
        console.log('\nNext steps:\n  bun install\n');

      } catch (error: any) {
        console.error(chalk.red(`\nError: ${error.message}`));
        process.exit(1);
      }
    });
}
