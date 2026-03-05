import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mergeMigrations } from '../../../packages/core/src/utils/migration-resolver';
import fs from 'fs';
import path from 'path';
import { rmSync, mkdirSync, writeFileSync } from 'fs';

describe('migration-resolver', () => {
  const testDir = path.join(process.cwd(), 'tmp-migration-test');

  beforeEach(() => {
    if (fs.existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
  });

  it('should merge multiple SQL files correctly', () => {
    writeFileSync(path.join(testDir, '001.sql'), 'CREATE TABLE A;');
    writeFileSync(path.join(testDir, '002.sql'), 'CREATE TABLE B;');
    
    const result = mergeMigrations(testDir);
    
    expect(result.success).toBe(true);
    expect(result.mergedCount).toBe(2);
    
    const outputContent = fs.readFileSync(result.outputFile, 'utf8');
    expect(outputContent).toContain('CREATE TABLE A;');
    expect(outputContent).toContain('CREATE TABLE B;');
  });
});
