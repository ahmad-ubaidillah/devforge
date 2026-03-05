import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { installPlugin } from '../../../packages/core/src/plugins/plugin-installer';
import fs from 'fs-extra';
import path from 'path';
import { loadPlugin } from '../../../packages/core/src/plugins/plugin-loader';

vi.mock('../../../packages/core/src/plugins/plugin-loader', () => ({
  loadPlugin: vi.fn(),
}));

describe('plugin-installer', () => {
  const testProjectDir = path.join(process.cwd(), 'tmp-plugin-install-test');
  const mockPluginDir = path.join(process.cwd(), 'packages/plugins/mock-plugin');

  beforeEach(() => {
    if (fs.existsSync(testProjectDir)) fs.rmSync(testProjectDir, { recursive: true, force: true });
    fs.mkdirSync(testProjectDir, { recursive: true });
    
    // Create a dummy package.json in target
    fs.writeFileSync(path.join(testProjectDir, 'package.json'), JSON.stringify({ name: 'test-app', dependencies: {} }));

    // Create a dummy plugin files dir
    if (!fs.existsSync(mockPluginDir)) fs.mkdirSync(mockPluginDir, { recursive: true });
    const filesDir = path.join(mockPluginDir, 'files');
    fs.mkdirSync(filesDir, { recursive: true });
    fs.writeFileSync(path.join(filesDir, 'README.md'), 'Hello {{PROJECT_NAME}}');
  });

  afterEach(() => {
    if (fs.existsSync(testProjectDir)) fs.rmSync(testProjectDir, { recursive: true, force: true });
    // We leave mockPluginDir alone or clean it if we're brave
    if (fs.existsSync(mockPluginDir)) fs.rmSync(mockPluginDir, { recursive: true, force: true });
  });

  it('should copy plugin files and merge dependencies', async () => {
    const mockPluginConfig = {
      name: 'mock-plugin',
      description: 'Mock',
      packageDependencies: { 'mock-dep': '1.0.0' }
    };

    (loadPlugin as any).mockReturnValue(mockPluginConfig as any);
    
    await installPlugin('mock-plugin', testProjectDir, { projectName: 'MyCoolApp' });
    
    // Check if file was copied
    expect(fs.existsSync(path.join(testProjectDir, 'README.md'))).toBe(true);
    
    // Check if variable replacement worked
    const content = fs.readFileSync(path.join(testProjectDir, 'README.md'), 'utf8');
    expect(content).toContain('Hello MyCoolApp');

    // Check if dependency was merged
    const pkg = JSON.parse(fs.readFileSync(path.join(testProjectDir, 'package.json'), 'utf8'));
    expect(pkg.dependencies['mock-dep']).toBe('1.0.0');
  });
});
