import { describe, it, expect, vi } from 'vitest';
import { generateArchitectureGraph } from '../../../packages/core/src/utils/graph-generator';
import { loadTemplate } from '../../../packages/core/src/engine/template-loader';
import { listAvailablePlugins } from '../../../packages/core/src/plugins/plugin-registry';

vi.mock('../../../packages/core/src/engine/template-loader', () => ({
  loadTemplate: vi.fn(),
}));

vi.mock('../../../packages/core/src/plugins/plugin-registry', () => ({
  listAvailablePlugins: vi.fn().mockReturnValue([]),
}));

describe('graph-generator', () => {
  it('should generate an architecture graph', () => {
    (listAvailablePlugins as any).mockReturnValue([
      { name: 'auth', description: 'desc' } as any
    ]);

    const graph = generateArchitectureGraph();

    expect(graph.nodes).toContainEqual(expect.objectContaining({ label: 'Core Engine' }));
    expect(graph.nodes).toContainEqual(expect.objectContaining({ label: 'auth' }));
    expect(graph.edges).toContainEqual(expect.objectContaining({ from: 'p-auth', to: 'core' }));
  });
});
