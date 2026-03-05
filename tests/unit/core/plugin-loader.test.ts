import { describe, it, expect, vi } from 'vitest';
import { loadPlugin } from '../../../packages/core/src/plugins/plugin-loader';
import * as fs from 'fs';
import * as path from 'path';

vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  existsSync: vi.fn(),
}));
vi.mock('path', () => ({
  join: (...args: any[]) => args.join('/'),
}));

describe('plugin-loader', () => {
  it('should load a valid plugin config', () => {
    const mockConfig = {
      name: 'auth',
      description: 'Auth plugin',
      compatibleTemplates: ['saas'],
      packageDependencies: { 'better-auth': 'latest' }
    };

    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockConfig));
    vi.spyOn(path, 'join').mockReturnValue('plugin.config.json');

    const config = loadPlugin('mock-plugin-path');
    expect(config.name).toBe('auth');
    expect(config.packageDependencies).toHaveProperty('better-auth');
  });

  it('should throw if plugin config is missing', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(() => loadPlugin('mock-path')).toThrow(/Plugin config not found/);
  });
});
