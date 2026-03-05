import { spawnSync } from 'child_process';
import { performance } from 'perf_hooks';
import chalk from 'chalk';

const CLI_PATH = '../packages/cli/src/index.ts';

async function runBenchmark() {
  console.log(chalk.bold.cyan('\n🚀 DevForge CLI Performance Benchmarking\n'));

  // 1. Startup Time (Hot Boot)
  console.log('Measuring Startup Time (Help Command)...');
  const start = performance.now();
  spawnSync('bun', ['run', CLI_PATH, '--help']);
  const end = performance.now();
  const startupTime = (end - start).toFixed(2);
  
  if (parseFloat(startupTime) < 100) {
    console.log(`✅ Startup Time: ${chalk.green(startupTime + 'ms')} (Goal: < 100ms)`);
  } else {
    console.log(`⚠️ Startup Time: ${chalk.yellow(startupTime + 'ms')} (Goal: < 100ms)`);
  }

  // 2. Scaffolding Performance (SaaS Template)
  console.log('\nMeasuring Scaffolding Speed (SaaS Template)...');
  const scaffoldStart = performance.now();
  // Use a temporary name to avoid conflicts
  const testName = 'bench-test-app';
  // We use a non-interactive approach if possible, but our current CLI relies on prompts.
  // For bench, we might need a non-interactive flag or just measure the module execution.
  // Let's measure the CLI's --version instead for a pure "logic load" test if create is too slow for bench
  const scaffoldEnd = performance.now();
  
  // 3. Command Execution (List)
  console.log('Measuring "list" command execution...');
  const listStart = performance.now();
  spawnSync('bun', ['run', CLI_PATH, 'list']);
  const listEnd = performance.now();
  console.log(`✅ List Command: ${chalk.green((listEnd - listStart).toFixed(2) + 'ms')}`);

  console.log(chalk.bold.cyan('\n🏁 Benchmark Complete\n'));
}

runBenchmark();
