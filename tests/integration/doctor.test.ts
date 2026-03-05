import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { runDiagnostics, fixDiagnostics } from '../../packages/core/src/utils/doctor';
import { writeFileSync, rmSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

describe('Task 18: Self-Healing Doctor Smoke Test', () => {
  const testDir = join(process.cwd(), 'tmp-doctor-test');

  beforeEach(() => {
    if (existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
  });

  it('should detect and fix missing .env based on .env.example', () => {
    writeFileSync(join(testDir, '.env.example'), 'API_KEY=123\nDEBUG=true');
    
    // Check
    const results = runDiagnostics(testDir);
    const missingEnv = results.find(r => r.issue.includes('Missing .env file'));
    expect(missingEnv).toBeDefined();

    // Fix
    const fixes = fixDiagnostics(testDir, results);
    expect(fixes).toContain('Created .env from .env.example');
    expect(existsSync(join(testDir, '.env'))).toBe(true);
  });

  it('should detect and fix missing keys in .env', () => {
    writeFileSync(join(testDir, '.env.example'), 'KEY_A=valA\nKEY_B=valB');
    writeFileSync(join(testDir, '.env'), 'KEY_A=valA');

    // Check
    const results = runDiagnostics(testDir);
    const missingKeys = results.find(r => r.issue.includes('Missing keys in .env'));
    expect(missingKeys).toBeDefined();

    // Fix
    fixDiagnostics(testDir, results);
    const fixedContent = readFileSync(join(testDir, '.env'), 'utf8');
    expect(fixedContent).toContain('KEY_B=valB');
  });
});
