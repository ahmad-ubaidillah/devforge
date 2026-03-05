import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

export function registerCreatePluginCommand(program: Command) {
  program
    .command('create-plugin')
    .description('Scaffold a new DevForge plugin skeleton')
    .requiredOption('-n, --name <name>', 'Name of the plugin')
    .action(async (options) => {
      try {
        const pluginName = options.name;
        const targetDir = join(process.cwd(), 'packages', 'plugins', pluginName);

        console.log(chalk.bold.cyan(`\n🧩 Scaffolding DevForge Plugin: ${pluginName}\n`));
        const spinner = ora('Generating plugin structure...').start();

        if (existsSync(targetDir)) {
          spinner.fail(chalk.red(`Directory already exists: ${targetDir}`));
          process.exit(1);
        }

        // 1. Create base directories
        const dirsToCreate = [
          targetDir,
          join(targetDir, 'files', 'src', 'modules', pluginName, 'services'),
          join(targetDir, 'files', 'src', 'modules', pluginName, 'routes'),
          join(targetDir, 'files', 'src', 'modules', pluginName, 'db'),
        ];

        dirsToCreate.forEach(dir => mkdirSync(dir, { recursive: true }));

        // 2. Create plugin.config.json
        const pluginConfig = {
          name: pluginName,
          description: `DevForge ${pluginName} plugin`,
          compatibleTemplates: ["saas", "marketplace", "crm"],
          packageDependencies: {},
          packageDevDependencies: {}
        };

        writeFileSync(
          join(targetDir, 'plugin.config.json'),
          JSON.stringify(pluginConfig, null, 2),
          'utf8'
        );

        // 3. Create a placeholder service file
        const serviceCode = `export class ${pluginName.charAt(0).toUpperCase() + pluginName.slice(1)}Service {\n  constructor() {\n    // Initialize service\n  }\n}\n`;
        writeFileSync(
          join(targetDir, 'files', 'src', 'modules', pluginName, 'services', `${pluginName}.service.ts`),
          serviceCode,
          'utf8'
        );

        spinner.succeed(chalk.green(`Plugin "${pluginName}" scaffolded successfully!`));
        console.log(`\nNext steps:\n  cd packages/plugins/${pluginName}\n  # Start building your plugin logic\n`);

      } catch (error: any) {
        console.error(chalk.red(`\nError: ${error.message}`));
        process.exit(1);
      }
    });
}
