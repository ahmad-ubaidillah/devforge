import { existsSync, readFileSync, writeFileSync, copyFileSync, readdirSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import os from 'os';

export interface DiagnosticResult {
  issue: string;
  severity: 'error' | 'warning' | 'info';
  fix?: string;
  details?: string;
}

export function runDiagnostics(projectDir: string): DiagnosticResult[] {
  const results: DiagnosticResult[] = [];
  
  // 0. Environment & Tooling (The "Flutter Doctor" style checks)
  results.push(...checkSystemEnvironment());

  // 1. Check for .env.example vs .env
  const envExamplePath = join(projectDir, '.env.example');
  const envPath = join(projectDir, '.env');

  if (existsSync(envExamplePath) && !existsSync(envPath)) {
    results.push({
      issue: 'Missing .env file (found .env.example)',
      severity: 'warning',
      fix: 'cp .env.example .env'
    });
  } else if (existsSync(envExamplePath) && existsSync(envPath)) {
    try {
      const exampleContent = readFileSync(envExamplePath, 'utf8');
      const envContent = readFileSync(envPath, 'utf8');
      const exampleKeys = exampleContent.split('\n')
        .map(line => line.split('=')[0].trim())
        .filter(key => key && !key.startsWith('#'));
      const missingKeys = exampleKeys.filter(key => !envContent.includes(`${key}=`));

      if (missingKeys.length > 0) {
        results.push({
          issue: `Missing keys in .env: ${missingKeys.join(', ')}`,
          severity: 'warning',
          fix: 'Update .env with keys from .env.example'
        });
      }
    } catch (e) { /* ignore */ }
  }

  // 2. Dependencies & Lockfiles
  if (!existsSync(join(projectDir, 'node_modules'))) {
    results.push({
      issue: 'Dependencies not installed',
      severity: 'error',
      fix: 'bun install'
    });
  }

  // 3. Project Configuration (DevForge specific)
  const pkgPath = join(projectDir, 'package.json');
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      if (!pkg.dependencies?.['hono'] && !pkg.dependencies?.['astro']) {
        results.push({
          issue: 'Project does not appear to be a DevForge template',
          severity: 'warning'
        });
      }
    } catch (error: any) {
      results.push({
        issue: `Malformed package.json syntax: ${error.message}`,
        severity: 'error'
      });
    }
  }

  // 4. Test Directory Structure
  const rootDirs = readdirSync(projectDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  if (!rootDirs.includes('tests')) {
    results.push({
      issue: 'Missing centralized tests/ directory',
      severity: 'warning',
      fix: 'mkdir -p tests/{unit,smoke,integration}'
    });
  }

  // 5. Cleanup checks
  const clutter = rootDirs.filter(d => d.startsWith('smoke-test-'));
  if (clutter.length > 0) {
    results.push({
      issue: `Root directory cluttered with temporary test folders`,
      severity: 'warning',
      fix: 'rm -rf smoke-test-*',
      details: clutter.join(', ')
    });
  }

  return results;
}

function checkSystemEnvironment(): DiagnosticResult[] {
  const envResults: DiagnosticResult[] = [];
  
  // OS Info
  envResults.push({
    issue: `Platform: ${os.platform()} (${os.release()})`,
    severity: 'info',
    details: `Arch: ${os.arch()}, CPU: ${os.cpus()[0]?.model}`
  });

  // Bun check
  try {
    const bunVer = execSync('bun --version').toString().trim();
    envResults.push({
      issue: `Bun version: ${bunVer}`,
      severity: 'info'
    });
  } catch {
    envResults.push({
      issue: 'Bun is not installed',
      severity: 'error',
      fix: 'curl -fsSL https://bun.sh/install | bash'
    });
  }

  // Node check
  try {
    const nodeVer = execSync('node --version').toString().trim();
    envResults.push({
      issue: `Node.js version: ${nodeVer}`,
      severity: 'info'
    });
  } catch {
    envResults.push({
      issue: 'Node.js is not installed',
      severity: 'warning'
    });
  }

  // Git check
  try {
    const gitVer = execSync('git --version').toString().trim();
    envResults.push({
      issue: `Git version: ${gitVer}`,
      severity: 'info'
    });
  } catch {
    envResults.push({
      issue: 'Git is not installed',
      severity: 'warning'
    });
  }

  return envResults;
}

export function fixDiagnostics(projectDir: string, results: DiagnosticResult[]) {
  const fixesPerformed: string[] = [];
  for (const r of results) {
    if (!r.fix) continue;
    try {
      if (r.issue.includes('Missing .env file')) {
        copyFileSync(join(projectDir, '.env.example'), join(projectDir, '.env'));
        fixesPerformed.push('Created .env from .env.example');
      } else if (r.issue.includes('Missing keys in .env')) {
        const exampleContent = readFileSync(join(projectDir, '.env.example'), 'utf8');
        const envContent = readFileSync(join(projectDir, '.env'), 'utf8');
        let newEnv = envContent;
        exampleContent.split('\n').forEach(line => {
          const key = line.split('=')[0].trim();
          if (key && !key.startsWith('#') && !envContent.includes(`${key}=`)) newEnv += `\n${line}`;
        });
        writeFileSync(join(projectDir, '.env'), newEnv);
        fixesPerformed.push('Fixed .env keys');
      } else if (r.issue.includes('Root directory cluttered')) {
        execSync('rm -rf smoke-test-*', { cwd: projectDir });
        fixesPerformed.push('Cleaned root clutter');
      } else if (r.issue.includes('Missing centralized tests/ directory')) {
        const testBase = join(projectDir, 'tests');
        if (!existsSync(testBase)) {
          mkdirSync(testBase);
          mkdirSync(join(testBase, 'unit'));
          mkdirSync(join(testBase, 'smoke'));
          mkdirSync(join(testBase, 'integration'));
          fixesPerformed.push('Created tests/ structure');
        }
      }
    } catch (e: any) {
      console.error(`Fix failed: ${e.message}`);
    }
  }
  return fixesPerformed;
}

