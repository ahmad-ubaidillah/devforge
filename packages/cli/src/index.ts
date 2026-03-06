#!/usr/bin/env bun
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { promptTemplate, promptPlugins } from './prompts';
import { scaffold } from '../../core/src/engine/scaffolder';
import { loadTemplate } from '../../core/src/engine/template-loader';
import { installPlugin } from '../../core/src/plugins/plugin-installer';
import { listAvailablePlugins } from '../../core/src/plugins/plugin-registry';
import { runDiagnostics } from '../../core/src/utils/doctor';
import { registerCreatePluginCommand } from './commands/create-plugin';
import { registerUICommand } from './commands/ui';

export function createProgram() {
  const program = new Command();

  program
    .name('devforge-cli')
    .description('Modular Boilerplate Ecosystem for Modern Web Apps')
    .version('1.0.0');

  registerCreatePluginCommand(program);
  registerUICommand(program);

  program
    .command('create')
    .description('Scaffold a new project')
    .argument('[name]', 'Project name')
    .action(async (name) => {
      try {
        console.log(chalk.bold.cyan('\n🚀 Welcome to DevForge CLI\n'));

        const projectName = name || 'my-devforge-app';
        const templateName = await promptTemplate();
        
        const templatePath = join(process.cwd(), 'templates', templateName);
        const templateConfig = loadTemplate(templatePath);
        
        const plugins = await promptPlugins(templateConfig.supportedPlugins);

        const targetDir = join(process.cwd(), projectName);
        
        const spinner = ora('Scaffolding your project...').start();
        
        await scaffold({
          projectName,
          templateName,
          targetDir,
          plugins
        });

        spinner.succeed(chalk.green(`Project "${projectName}" created successfully!`));
        console.log(`\nNext steps:\n  cd ${projectName}\n  bun install\n  bun run dev\n`);

      } catch (error: any) {
        console.error(chalk.red(`\nError: ${error.message}`));
        process.exit(1);
      }
    });

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

  program
    .command('ai')
    .description('AI-assisted architectural guidance')
    .argument('<prompt>', 'Your technical question or generation request')
    .option('-t, --template <type>', 'Template context (saas, cms, etc)', 'general')
    .action(async (prompt, options) => {
      try {
        const spinner = ora('Consulting DevForge AI Engine...').start();
        
        // In a real implementation, this would call an LLM with the context from core/src/ai/prompts.ts
        // For now, we simulate the logic load and return the core architectural advice.
        setTimeout(() => {
          spinner.succeed(chalk.green('AI Guidance Generated:'));
          console.log(chalk.dim('\n----------------------------------------'));
          console.log(chalk.bold('System Context:'), chalk.cyan(options.template));
          console.log(chalk.bold('User Intent:   '), chalk.white(prompt));
          console.log(chalk.dim('----------------------------------------\n'));
          console.log(chalk.yellow('Pro Tip: ') + 'Always separate your business logic into services and use Drizzle for type-safety.\n');
        }, 1500);
        
      } catch (error: any) {
        console.error(chalk.red(`\nError: ${error.message}`));
        process.exit(1);
      }
    });

  program
    .command('doctor')
    .description('Run health checks on your DevForge project')
    .option('-f, --fix', 'Attempt to automatically fix issues')
    .action(async (options) => {
      const { runDiagnostics, fixDiagnostics } = await import('../../core/src/utils/doctor');
      const projectDir = process.cwd();
      const results = runDiagnostics(projectDir);
      
      console.log(chalk.bold.cyan('\n🩺 DevForge Health Report:\n'));
      
      if (results.length === 0) {
        console.log(chalk.green('✅ No issues found. Your project is in peak condition!\n'));
      } else {
        results.forEach(r => {
          let icon = '⚠️';
          let color = chalk.yellow;

          if (r.severity === 'error') {
            icon = '❌';
            color = chalk.red;
          } else if (r.severity === 'info') {
            icon = 'ℹ️';
            color = chalk.blue;
          }

          console.log(`${icon} ${color(r.issue)}`);
          if (r.details) {
            console.log(`   ${chalk.dim(r.details)}`);
          }
          if (r.fix) {
            console.log(`   ${chalk.dim('Fix Suggestion:')} ${chalk.green(r.fix)}`);
          }
          console.log();
        });

        if (options.fix) {
          console.log(chalk.bold.blue('🔧 Self-Healing Initiated...\n'));
          const fixes = fixDiagnostics(projectDir, results);
          if (fixes.length > 0) {
            fixes.forEach(f => console.log(chalk.green(`   ✔ ${f}`)));
            console.log(chalk.bold.green('\n✅ Repair complete! Re-run doctor to verify.\n'));
          } else {
            console.log(chalk.yellow('   ! No automatic fixes could be applied for these issues.\n'));
          }
        } else {
          console.log(chalk.dim('Run devforge-cli doctor --fix to attempt automatic repairs.\n'));
        }
      }
    });

  return program;
}
