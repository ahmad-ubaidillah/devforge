import { describe, it, expect, vi, beforeEach } from 'vitest';
import { scaffold } from '../../../packages/core/src/engine/scaffolder';
import { loadTemplate } from '../../../packages/core/src/engine/template-loader';
import { composeTemplate } from '../../../packages/core/src/engine/template-composer';
import { installPlugin } from '../../../packages/core/src/plugins/plugin-installer';

vi.mock('../../../packages/core/src/engine/template-loader', () => ({
  loadTemplate: vi.fn(),
}));

vi.mock('../../../packages/core/src/engine/template-composer', () => ({
  composeTemplate: vi.fn(),
}));

vi.mock('../../../packages/core/src/plugins/plugin-installer', () => ({
  installPlugin: vi.fn().mockResolvedValue({ success: true }),
}));

describe('scaffolder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should orchestrate the full scaffolding process', async () => {
    const mockTemplate = {
      name: 'saas',
      plugins: ['auth', 'cms'],
    };

    (loadTemplate as any).mockReturnValue(mockTemplate as any);

    const result = await scaffold({
      projectName: 'test-app',
      templateName: 'saas',
      plugins: ['auth'],
      targetDir: '/tmp/test-app',
    });

    expect(result.success).toBe(true);
    expect(loadTemplate).toHaveBeenCalled();
    expect(composeTemplate).toHaveBeenCalled();
  });

  it('should throw if zod validation fails', async () => {
    await expect(scaffold({
      projectName: '',
      templateName: 'saas',
      targetDir: '/tmp/test-app',
    } as any)).rejects.toThrow('Invalid scaffold options');
  });
});
