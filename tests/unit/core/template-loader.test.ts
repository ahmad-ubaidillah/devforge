import { describe, it, expect, vi } from 'vitest';
import { loadTemplate, TemplateConfigSchema } from '../../../packages/core/src/engine/template-loader';
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

describe('template-loader', () => {
  it('should load a valid template config', () => {
    const mockConfig = {
      name: 'test-template',
      description: 'A test template',
      stack: { runtime: 'bun' },
      supportedPlugins: ['auth'],
    };

    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockConfig));
    vi.spyOn(path, 'join').mockReturnValue('template.config.json');

    const config = loadTemplate('mock-path');
    expect(config.name).toBe('test-template');
    expect(config.supportedPlugins).toContain('auth');
  });

  it('should throw if config file is missing', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(() => loadTemplate('mock-path')).toThrow(/Template config not found/);
  });

  it('should throw if config is invalid', () => {
    const invalidConfig = { name: 123 }; // Invalid type for name
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(invalidConfig));

    expect(() => loadTemplate('mock-path')).toThrow(/Invalid template configuration/);
  });
});
