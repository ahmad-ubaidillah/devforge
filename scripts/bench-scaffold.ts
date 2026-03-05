import { scaffold } from '../packages/core/src/engine/scaffolder';
import { rmSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

async function runBench() {
  const projectName = 'bench-test-app';
  const targetDir = join(process.cwd(), 'tmp', projectName);
  
  if (existsSync(targetDir)) {
    rmSync(targetDir, { recursive: true, force: true });
  }
  mkdirSync(join(process.cwd(), 'tmp'), { recursive: true });

  console.log('🚀 Starting Benchmark: Scaffolding SaaS Template + 3 Plugins...');
  
  const start = performance.now();
  
  await scaffold({
    projectName,
    templateName: 'saas',
    targetDir,
    plugins: ['auth', 'search', 'cms']
  });
  
  const end = performance.now();
  const duration = (end - start).toFixed(2);
  
  console.log(`✅ Scaffolding Complete in ${duration}ms`);
  
  if (Number(duration) < 500) {
    console.log('⚡ PERFORMANCE GOAL MET: Under 500ms');
  } else {
    console.log('⚠️ PERFORMANCE GOAL MISSED: Over 500ms');
  }

  // Cleanup
  rmSync(targetDir, { recursive: true, force: true });
}

runBench().catch(console.error);
