import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { bindPermissions } from '../../../packages/core/src/validators/permission-binder';
import fs from 'fs';
import path from 'path';
import { rmSync, mkdirSync, writeFileSync } from 'fs';

describe('permission-binder', () => {
  const testDir = path.join(process.cwd(), 'tmp-perms-test');

  beforeEach(() => {
    if (fs.existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
    mkdirSync(path.join(testDir, 'src'), { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
  });

  it('should detect permissions from comments and exports', () => {
    const routeFile = path.join(testDir, 'src/users.routes.ts');
    const mockFileContent = `
      // @permission auth.admin
      export const permissions = { 
        read: 'auth.read'
      };
    `;
    writeFileSync(routeFile, mockFileContent);

    const bindings = bindPermissions(testDir);
    
    const permissions = bindings.map(b => b.permission);
    expect(permissions).toContain('auth.admin');
    expect(permissions).toContain('auth.read');
  });

  it('should return empty if no permissions found', () => {
    writeFileSync(path.join(testDir, 'src/empty.routes.ts'), 'const x = 1;');
    const bindings = bindPermissions(testDir);
    expect(bindings).toHaveLength(0);
  });
});
