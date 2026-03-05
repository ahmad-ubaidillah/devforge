import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { runDiagnostics, fixDiagnostics } from '../../../packages/core/src/utils/doctor';
import fs from 'fs';
import path from 'path';

describe('doctor-edge-cases', () => {
  const testDir = path.join(process.cwd(), 'tmp-doctor-edge');

  beforeEach(() => {
    if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should handle malformed package.json', () => {
    fs.writeFileSync(path.join(testDir, 'package.json'), 'invalid json');
    const results = runDiagnostics(testDir);
    expect(results).toContainEqual(expect.objectContaining({ severity: 'error', issue: expect.stringContaining('Malformed package.json') }));
  });

  it('should handle empty .env.example correctly', () => {
    fs.writeFileSync(path.join(testDir, '.env.example'), '# only comments');
    fs.writeFileSync(path.join(testDir, '.env'), '');
    const results = runDiagnostics(testDir);
    // Should not find missing keys if example is empty/comments
    expect(results.filter(r => r.issue.includes('Missing keys'))).toHaveLength(0);
  });

  it('should not perform fixes if fixDiagnostics receives empty results', () => {
    const fixes = fixDiagnostics(testDir, []);
    expect(fixes).toHaveLength(0);
  });
});
