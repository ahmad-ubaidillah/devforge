import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { 
  DiagnosticResult, 
  checkSystemEnvironment, 
  performFixes, 
  checkProjectConfig 
} from './doctor-checks';

export { DiagnosticResult };

export function runDiagnostics(projectDir: string): DiagnosticResult[] {
  const results: DiagnosticResult[] = [];
  
  // 0. Environment & Tooling
  results.push(...checkSystemEnvironment());

  // 1. Check for .env.example vs .env
  checkEnvFiles(projectDir, results);

  // 2. Dependencies & Lockfiles
  checkDependencies(projectDir, results);

  // 3. Project Configuration
  checkProjectConfig(projectDir, results);

  // 4. Test Directory Structure
  checkTestStructure(projectDir, results);

  // 5. Cleanup checks
  checkClutter(projectDir, results);

  return results;
}

export function fixDiagnostics(projectDir: string, results: DiagnosticResult[]) {
  return performFixes(projectDir, results);
}

function checkEnvFiles(projectDir: string, results: DiagnosticResult[]) {
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
}

function checkDependencies(projectDir: string, results: DiagnosticResult[]) {
  if (!existsSync(join(projectDir, 'node_modules'))) {
    results.push({
      issue: 'Dependencies not installed',
      severity: 'error',
      fix: 'bun install'
    });
  }
}

function checkTestStructure(projectDir: string, results: DiagnosticResult[]) {
  if (!existsSync(join(projectDir, 'tests'))) {
    results.push({
      issue: 'Missing centralized tests/ directory',
      severity: 'warning',
      fix: 'mkdir -p tests/{unit,smoke,integration}'
    });
  }
}

function checkClutter(projectDir: string, results: DiagnosticResult[]) {
  const rootDirs = readdirSync(projectDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const clutter = rootDirs.filter(d => d.startsWith('smoke-test-'));
  if (clutter.length > 0) {
    results.push({
      issue: `Root directory cluttered with temporary test folders`,
      severity: 'warning',
      fix: 'rm -rf smoke-test-*',
      details: clutter.join(', ')
    });
  }
}
