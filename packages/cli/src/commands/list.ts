import { Command } from 'commander';
import chalk from 'chalk';
import { listAvailablePlugins } from '../../../core/src/plugins/plugin-registry';

export function registerListCommand(program: Command) {
  program
    .command('list')
    .description('List all available plugins')
    .action(() => {
      const plugins = listAvailablePlugins();
      console.log(chalk.bold.cyan('\n🧩 Available Plugins:\n'));
      plugins.forEach(p => {
        console.log(`${chalk.bold.green(p.name.padEnd(15))} - ${p.description}`);
      });
      console.log();
    });
}
