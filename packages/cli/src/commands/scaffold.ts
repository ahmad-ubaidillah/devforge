import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { EntityScaffolder } from '@ahmadubaidillah/core';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

export function registerScaffoldCommand(program: Command) {
  program
    .command('scaffold')
    .description('Generate a full CRUD entity (Model, Service, Route, Validator)')
    .argument('<name>', 'Name of the entity to scaffold')
    .action(async (name) => {
      try {
        console.log(chalk.bold.cyan(`\n🏗️ Scaffolding Entity: ${name}\n`));
        const spinner = ora('Generating CRUD layers...').start();

        const projectDir = process.cwd();
        const { baseDir } = EntityScaffolder.scaffold(projectDir, name);

        // Auto-wire the route if app.tsx exists
        const appPath = join(projectDir, 'src', 'app.tsx');
        if (existsSync(appPath)) {
          let appContent = readFileSync(appPath, 'utf8');
          const nameLower = name.toLowerCase();
          const importStmt = `import { ${nameLower}Routes } from './modules/${nameLower}/routes/${nameLower}.routes';\n`;
          const routeStmt = `api.route('/${nameLower}', ${nameLower}Routes);\n`;

          if (!appContent.includes(importStmt)) {
            appContent = importStmt + appContent;
          }

          if (!appContent.includes(routeStmt)) {
            const marker = '// [PLUGIN_ROUTES_INJECTION_POINT]';
            if (appContent.includes(marker)) {
              appContent = appContent.replace(marker, `${marker}\n${routeStmt}`);
            }
          }
          writeFileSync(appPath, appContent);
        }

        spinner.succeed(chalk.green(`Entity "${name}" scaffolded and wired successfully!`));
        console.log(`\nLocation: ${baseDir}\n`);

      } catch (error: any) {
        console.error(chalk.red(`\nError: ${error.message}`));
        process.exit(1);
      }
    });
}
