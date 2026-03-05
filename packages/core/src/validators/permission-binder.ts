import { readFileSync } from 'fs';
import { globSync } from 'glob';
import { join } from 'path';

export interface PermissionBinding {
  route: string;
  permission: string;
}

export function bindPermissions(projectDir: string): PermissionBinding[] {
  const routeFiles = globSync(join(projectDir, 'src/**/*.routes.ts'));
  const bindings: PermissionBinding[] = [];

  for (const file of routeFiles) {
    const content = readFileSync(file, 'utf8');
    
    // Simple regex to find permission definitions like:
    // export const permissions = { create: 'auth.create' }
    // Or comments like: // @permission auth.read
    
    const permissionRegex = /@permission\s+([a-zA-Z0-9._-]+)/g;
    let match;
    while ((match = permissionRegex.exec(content)) !== null) {
      bindings.push({
        route: file,
        permission: match[1]
      });
    }

    // Also look for static object exports
    const staticRegex = /['"]?([a-zA-Z0-9_-]+)['"]?\s*:\s*['"]([a-zA-Z0-9._-]+)['"]/g;
    if (content.includes('export const permissions')) {
      while ((match = staticRegex.exec(content)) !== null) {
        bindings.push({
          route: file,
          permission: match[2]
        });
      }
    }
  }

  return bindings;
}
