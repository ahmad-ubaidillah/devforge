import { scaffold } from '../packages/core/src/engine/scaffolder';
import { join } from 'path';
import { existsSync, rmSync, mkdirSync } from 'fs';

async function testScaffolding() {
  const testProjectName = 'smoke-test-app';
  const targetDir = join(process.cwd(), 'tests', testProjectName);

  if (existsSync(targetDir)) {
    rmSync(targetDir, { recursive: true, force: true });
  }

  console.log('Testing scaffolding for "saas" template with all core plugins...');
  await scaffold({
    projectName: testProjectName,
    templateName: 'saas',
    targetDir: targetDir,
    plugins: ['auth', 'payments', 'email', 'search', 'file_upload']
  });

  if (existsSync(join(targetDir, 'package.json'))) {
    console.log('✅ Scaffolding successful!');
    
    // Verify variable replacement
    const pkg = JSON.parse(await Bun.file(join(targetDir, 'package.json')).text());
    if (pkg.name === testProjectName) {
      console.log('✅ Template variable replacement successful!');
    } else {
      console.error('❌ Template variable replacement failed!');
    }

    // Verify plugin installation
    const authRouteFile = join(targetDir, 'src/modules/auth/routes/auth.routes.ts');
    if (existsSync(authRouteFile)) {
      console.log('✅ Plugin file installation successful!');
    } else {
      console.error('❌ Plugin file installation failed - Auth routes missing!');
    }

    // Verify dependency merging
    if (pkg.dependencies && pkg.dependencies['better-auth']) {
      console.log('✅ Plugin dependency merging successful!');
    } else {
      console.error('❌ Plugin dependency merging failed - better-auth missing!');
    }

    // Verify Dependency Graph Validator
    const { validateDependencyGraph } = await import('../packages/core/src/validators/dependency-graph');
    try {
      validateDependencyGraph([
        ['AuthService', 'UserRepository'],
        ['UserRepository', 'Database']
      ]);
      console.log('✅ Dependency Graph Validator successful (no cycles)!');
      
      try {
        validateDependencyGraph([
          ['A', 'B'],
          ['B', 'C'],
          ['C', 'A']
        ]);
        console.error('❌ Dependency Graph Validator failed - missed circular dependency!');
      } catch (e) {
        console.log('✅ Dependency Graph Validator successful (detected cycle)!');
      }
    } catch (e: any) {
      console.error(`❌ Dependency Graph Validator failed: ${e.message}`);
    }

    // Verify Permission Binder
    const { bindPermissions } = await import('../packages/core/src/validators/permission-binder');
    // Add a dummy permission to the smoke test app
    const originalContent = await Bun.file(authRouteFile).text();
    await Bun.write(authRouteFile, `// @permission auth.admin\nexport const permissions = { read: 'auth.read' };\n` + originalContent);
    
    const bindings = bindPermissions(targetDir);
    if (bindings.some(b => b.permission === 'auth.admin') && bindings.some(b => b.permission === 'auth.read')) {
      console.log('✅ Permission Binder successful!');
    } else {
       console.error('❌ Permission Binder failed - permissions not detected!');
    }

    // Verify Migration Conflict Resolver
    const { mergeMigrations } = await import('../packages/core/src/utils/migration-resolver');
    const migrationDir = join(targetDir, 'drizzle/migrations');
    if (!existsSync(migrationDir)) mkdirSync(migrationDir, { recursive: true });

    const m1 = join(migrationDir, '0001_users.sql');
    const m2 = join(migrationDir, '0002_payments.sql');
    await Bun.write(m1, 'CREATE TABLE users (id SERIAL PRIMARY KEY);');
    await Bun.write(m2, 'CREATE TABLE payments (id SERIAL PRIMARY KEY, user_id INTEGER);');

    const result = mergeMigrations(migrationDir);
    const mergedContent = await Bun.file(result.outputFile).text();

    if (result.success && mergedContent.includes('CREATE TABLE users') && mergedContent.includes('CREATE TABLE payments')) {
      console.log('✅ Migration Conflict Resolver successful!');
    } else {
      console.error('❌ Migration Conflict Resolver failed!');
    }

    // Verify CMS Template
    const remainingTemplates = ['marketplace', 'ai_wrapper', 'booking', 'finance', 'crm'];
    
    for (const tName of remainingTemplates) {
      console.log(`Testing scaffolding for "${tName}" template...`);
      const pName = `smoke-test-${tName}`;
      const pDir = join(process.cwd(), 'tests', pName);
      if (existsSync(pDir)) rmSync(pDir, { recursive: true, force: true });

      await scaffold({
        projectName: pName,
        templateName: tName,
        targetDir: pDir,
        plugins: []
      });

      if (existsSync(join(pDir, 'package.json')) && existsSync(join(pDir, 'src/app.ts'))) {
        console.log(`✅ ${tName.toUpperCase()} Template scaffolding successful!`);
      } else {
        console.error(`❌ ${tName.toUpperCase()} Template scaffolding failed!`);
      }
    }

  } else {
    console.error('❌ Scaffolding failed - package.json not found!');
  }

  // Cleanup
  // rmSync(targetDir, { recursive: true, force: true });
}

testScaffolding();
