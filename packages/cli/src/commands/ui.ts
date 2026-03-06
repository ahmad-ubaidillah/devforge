import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { join, dirname } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

export function registerUICommand(program: Command) {
  const uiCmd = program
    .command('ui')
    .description('Manage DevForge UI components');

  uiCmd
    .command('add')
    .argument('<component>', 'Name of the component to add (e.g. Button, Input)')
    .option('-f, --framework <framework>', 'Target framework (solid, react, preact, astro)', 'solid')
    .description('Add a DevForge editorial UI component to your project')
    .action(async (component, options) => {
      try {
        console.log(chalk.bold.cyan(`\n✨ Adding DevForge UI Component: ${component}\n`));
        const spinner = ora('Fetching component...').start();

        // Dynamically import uiRegistry since this is a CLI command and we don't want to spin up a server
        // We'll directly tap into the core registry package for local CLI usage.
        // If this was remote, we'd do a fetch('http://.../api/ui/components/...').
        const { uiRegistry } = await import('../../../core/src/ui/registry');

        const found = uiRegistry.getComponent(component, options.framework);

        if (!found) {
          spinner.fail(chalk.red(`Component "${component}" for framework "${options.framework}" not found in DevForge Registry.`));
          process.exit(1);
        }

        spinner.text = 'Writing files...';
        
        found.files.forEach(file => {
          const targetPath = join(process.cwd(), file.path);
          const targetDir = dirname(targetPath);
          
          if (!existsSync(targetDir)) {
            mkdirSync(targetDir, { recursive: true });
          }
          
          writeFileSync(targetPath, file.content, 'utf8');
          console.log(chalk.dim(`\n  📝 Created ${file.path}`));
        });

        spinner.succeed(chalk.green(`Component "${component}" installed successfully!`));
        
        if (found.dependencies && found.dependencies.length > 0) {
          console.log(chalk.bold.yellow(`\n⚠️  This component requires the following dependencies:\n`));
          console.log(chalk.white(`   bun add ${found.dependencies.join(' ')}\n`));
        }

      } catch (error: any) {
        console.error(chalk.red(`\nError: ${error.message}`));
        process.exit(1);
      }
    });
}
