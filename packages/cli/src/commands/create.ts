import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { join } from 'path';
import { promptTemplate, promptPlugins, promptAgentKey } from '../prompts';
import { scaffold, getTemplatesRoot } from '../../../core/src/engine/scaffolder';
import { loadTemplate } from '../../../core/src/engine/template-loader';

export function registerCreateCommand(program: Command) {
  program
    .command('create')
    .description('Scaffold a new project')
    .argument('[name]', 'Project name')
    .option('-a, --with-agents', 'Include premium AI agent system (requires key)')
    .action(async (name, options) => {
      try {
        console.log(chalk.bold.cyan('\n🚀 Welcome to DevForge CLI\n'));

        const projectName = name || 'my-devforge-app';
        const templateName = await promptTemplate();
        
        const templatesRoot = getTemplatesRoot();
        const templatePath = join(templatesRoot, templateName);
        const templateConfig = loadTemplate(templatePath);
        
        const plugins = await promptPlugins(templateConfig.supportedPlugins);

        let agentKey: string | undefined;
        if (options.withAgents) {
          agentKey = await promptAgentKey();
        }

        const targetDir = join(process.cwd(), projectName);
        
        const spinner = ora('Scaffolding your project...').start();
        
        await scaffold({
          projectName,
          templateName,
          targetDir,
          plugins,
          withAgents: !!options.withAgents,
          agentKey
        });

        spinner.succeed(chalk.green(`Project "${projectName}" created successfully!`));
        
        if (options.withAgents) {
          console.log(chalk.magenta('✨ Premium AI agents activated in .agents/ directory.'));
        }

        console.log(`\nNext steps:\n  cd ${projectName}\n  bun install\n  bun run dev\n`);

      } catch (error: any) {
        console.error(chalk.red(`\nError: ${error.message}`));
        process.exit(1);
      }
    });
}
