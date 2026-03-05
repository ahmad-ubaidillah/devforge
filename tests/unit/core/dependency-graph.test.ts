import { describe, it, expect } from 'vitest';
import { validateDependencyGraph } from '../../../packages/core/src/validators/dependency-graph';

describe('dependency-graph', () => {
  it('should return true for a valid graph without cycles', () => {
    const deps: [string, string][] = [
      ['A', 'B'],
      ['B', 'C'],
      ['D', 'C'],
    ];
    expect(validateDependencyGraph(deps)).toBe(true);
  });

  it('should throw an error for a simple cycle', () => {
    const deps: [string, string][] = [
      ['A', 'B'],
      ['B', 'A'],
    ];
    expect(() => validateDependencyGraph(deps)).toThrow(/Circular dependency detected: A -> B -> A/);
  });

  it('should throw an error for a complex cycle', () => {
    const deps: [string, string][] = [
      ['A', 'B'],
      ['B', 'C'],
      ['C', 'D'],
      ['D', 'B'],
    ];
    expect(() => validateDependencyGraph(deps)).toThrow(/Circular dependency detected:.*B -> C -> D -> B/);
  });
});
