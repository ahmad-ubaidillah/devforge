import { Command } from 'commander';
import chalk from 'chalk';

export function registerDoctorCommand(program: Command) {
  program
    .command('doctor')
    .description('Run health checks on your DevForge project')
    .option('-f, --fix', 'Attempt to automatically fix issues')
    .action(async (options) => {
      const { runDiagnostics, fixDiagnostics } = await import('../../../core/src/utils/doctor');
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
          const ora = (await import('ora')).default;
          const spinner = ora(chalk.bold.blue('🔧 Self-Healing Initiated...\n')).start();
          const fixes = fixDiagnostics(projectDir, results);
          if (fixes.length > 0) {
            spinner.stop();
            fixes.forEach(f => console.log(chalk.green(`   ✔ ${f}`)));
            console.log(chalk.bold.green('\n✅ Repair complete! Re-run doctor to verify.\n'));
          } else {
            spinner.warn(chalk.yellow('   ! No automatic fixes could be applied for these issues.\n'));
          }
        } else {
          console.log(chalk.dim('Run devforge-cli doctor --fix to attempt automatic repairs.\n'));
        }
      }
    });
}
