import { Command } from 'commander';
import { TokenTracker } from '@ahmad-ubaidillah/core/src/utils/token-tracker';
import chalk from 'chalk';

export function registerGainCommand(program: Command) {
  program
    .command('gain')
    .description('Show LLM API Token Savings Analytics')
    .option('-h, --history', 'Show detailed command history')
    .action((options) => {
      const stats = TokenTracker.getStats();

      console.log(chalk.bold.cyan('\nDevForge Token Efficiency Metrics:'));
      console.log(chalk.gray('----------------------------------'));
      console.log(`Original Total:   ${chalk.yellow(stats.totals.original)}`);
      console.log(`Optimized Total:  ${chalk.green(stats.totals.filtered)}`);
      console.log(`Total Savings:    ${chalk.bold.green(stats.totals.savings)} tokens`);
      console.log(`Efficiency Score: ${chalk.bold.blue(stats.totals.percentage.toFixed(2))}%`);
      console.log(chalk.gray('----------------------------------'));
      
      const budgetColor = stats.totals.dailyRemaining < 0 ? chalk.red : chalk.green;
      console.log(chalk.bold.white('\nDaily Cost Guardrail:'));
      console.log(`Daily Budget:     ${chalk.yellow(stats.totals.dailyBudget)} tokens`);
      console.log(`Daily Spent:      ${chalk.cyan(stats.totals.dailySpend)} tokens`);
      console.log(`Daily Remaining:  ${budgetColor(stats.totals.dailyRemaining)} tokens`);
      console.log(chalk.gray('----------------------------------'));

      if (options.history) {
        console.log(chalk.bold.white('\nRecent History:'));
        stats.history.slice(-10).forEach(r => {
          console.log(`${chalk.gray(r.timestamp.split('T')[1].split('.')[0])} ${chalk.cyan(r.command.padEnd(20))} ${chalk.green(r.percentage.toFixed(1))}% savings`);
        });
      }

      console.log(chalk.italic.gray('\nPowered by RTK-Filter & Semantic Consolidation\n'));
    });
}
