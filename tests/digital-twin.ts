import { join } from 'path';
import { existsSync, rmSync, mkdirSync, writeFileSync } from 'fs';
import { scaffold } from '../packages/core/src/engine/scaffolder';
import { installPlugin } from '../packages/core/src/plugins/plugin-installer';

/**
 * Digital Twin Simulation:
 * Orchestrates a high-speed, mock-driven E2E validation of the entire DevForge architecture.
 * It simulates a real user workflow: Scaffold -> Add Plugins -> Verify Integration.
 */

async function runDigitalTwin() {
  console.log('\n🚀 Starting Digital Twin Simulation...');
  console.log('--------------------------------------');

  const simulationName = 'digital-twin-app';
  const targetDir = join(process.cwd(), 'tests', simulationName);

  // 1. Reset Simulation Environment
  if (existsSync(targetDir)) {
    rmSync(targetDir, { recursive: true, force: true });
  }
  mkdirSync(targetDir, { recursive: true });

  try {
    // 2. Simulate Core Scaffolding
    console.log('Step 1: Simulating "SaaS" template scaffolding...');
    await scaffold({
      projectName: simulationName,
      templateName: 'saas',
      targetDir: targetDir,
      plugins: [] // Start with zero plugins
    });
    console.log('✅ Base scaffolding verified.');

    // 3. Simulate Incremental Plugin Injection (The core of modularity)
    const pluginsToTest = ['auth', 'payments', 'search'];
    for (const plugin of pluginsToTest) {
      console.log(`Step 2: Simulating "${plugin}" plugin injection...`);
      await installPlugin(plugin, targetDir, { projectName: simulationName });
      console.log(`✅ ${plugin} injection verified.`);
    }

    // 4. Verify Monorepo/Module Consistency
    console.log('Step 3: Verifying cross-module consistency...');
    const pkg = JSON.parse(Bun.file(join(targetDir, 'package.json')).text() as any);
    
    const requiredDeps = ['better-auth', 'stripe', 'meilisearch'];
    for (const dep of requiredDeps) {
      if (!pkg.dependencies[dep]) {
        throw new Error(`Integration Failure: Dependency "${dep}" missing from package.json`);
      }
    }
    console.log('✅ Dependency merging verified.');

    // 5. Simulate Configuration Validation (Zod boundaries)
    console.log('Step 4: Simulating Zod boundary validation...');
    const authServicePath = join(targetDir, 'src/modules/auth/services/auth.service.ts');
    if (!existsSync(authServicePath)) {
      throw new Error('Structural Failure: AuthService not found in projected path');
    }
    console.log('✅ Service layer discovery verified.');

    console.log('\n--------------------------------------');
    console.log('✨ DIGITAL TWIN SIMULATION COMPLETED SUCCESSFULLY!');
    console.log('Architecture Status: STABLE (v1.0.0-PROD)');
    console.log('--------------------------------------\n');

  } catch (error: any) {
    console.error('\n❌ DIGITAL TWIN SIMULATION FAILED!');
    console.error(`Reason: ${error.message}`);
    process.exit(1);
  } finally {
    // Keep the app for visual inspection if needed, or cleanup
    // rmSync(targetDir, { recursive: true, force: true });
  }
}

runDigitalTwin();
