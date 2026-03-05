import { describe, it, expect, vi } from 'vitest';

// 1. Mock heavy-weights
vi.mock('ora', () => ({
  default: () => ({
    start: vi.fn().mockReturnThis(),
    succeed: vi.fn(),
    fail: vi.fn(),
  })
}));

vi.mock('chalk', () => ({
  default: {
    bold: { cyan: vi.fn(s => s), green: vi.fn(s => s) },
    red: vi.fn(s => s),
    green: vi.fn(s => s),
    yellow: vi.fn(s => s),
    cyan: vi.fn(s => s),
    dim: vi.fn(s => s),
    white: vi.fn(s => s),
  }
}));

// 2. Mock prompts to BE SURE no UI runs
vi.mock('../../../packages/cli/src/prompts', () => ({
  promptTemplate: vi.fn().mockResolvedValue('saas'),
  promptPlugins: vi.fn().mockResolvedValue(['auth']),
}));

// 3. Mock core to avoid real FS/network
vi.mock('../../../packages/core/src/engine/scaffolder', () => ({
  scaffold: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock('../../../packages/core/src/plugins/plugin-installer', () => ({
  installPlugin: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock('../../../packages/core/src/plugins/plugin-registry', () => ({
  listAvailablePlugins: vi.fn().mockReturnValue([{ name: 'auth', description: 'desc' }]),
}));

import { createProgram } from '../../../packages/cli/src/index';

describe('CLI Logic', () => {
  it('should define commands correctly', () => {
    const program = createProgram();
    expect(program.commands.some(c => c.name() === 'create')).toBe(true);
    expect(program.commands.some(c => c.name() === 'doctor')).toBe(true);
  });

  it('should run create command logic', async () => {
    const program = createProgram();
    await program.parseAsync(['node', 'test', 'create', 'app-name']);
    const { scaffold } = await import('../../../packages/core/src/engine/scaffolder');
    expect(scaffold).toHaveBeenCalledWith(expect.objectContaining({ projectName: 'app-name' }));
  });

  it('should run add command logic', async () => {
    const program = createProgram();
    await program.parseAsync(['node', 'test', 'add', 'auth']);
    const { installPlugin } = await import('../../../packages/core/src/plugins/plugin-installer');
    expect(installPlugin).toHaveBeenCalled();
  });

  it('should run list command', async () => {
    const program = createProgram();
    await program.parseAsync(['node', 'test', 'list']);
    const { listAvailablePlugins } = await import('../../../packages/core/src/plugins/plugin-registry');
    expect(listAvailablePlugins).toHaveBeenCalled();
  });
});
