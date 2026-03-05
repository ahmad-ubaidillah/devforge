export class DependencyGraph {
  private adjList: Map<string, Set<string>> = new Map();

  addDependency(module: string, dependsOn: string) {
    if (!this.adjList.has(module)) {
      this.adjList.set(module, new Set());
    }
    this.adjList.get(module)!.add(dependsOn);
  }

  detectCycles(): string[] | null {
    const visited = new Set<string>();
    const recStack = new Set<string>();
    const path: string[] = [];

    for (const node of this.adjList.keys()) {
      if (this.hasCycle(node, visited, recStack, path)) {
        return path;
      }
    }

    return null;
  }

  private hasCycle(
    node: string,
    visited: Set<string>,
    recStack: Set<string>,
    path: string[]
  ): boolean {
    if (recStack.has(node)) {
      path.push(node);
      return true;
    }
    if (visited.has(node)) return false;

    visited.add(node);
    recStack.add(node);
    path.push(node);

    const neighbors = this.adjList.get(node) || new Set();
    for (const neighbor of neighbors) {
      if (this.hasCycle(neighbor, visited, recStack, path)) {
        return true;
      }
    }

    recStack.delete(node);
    path.pop();
    return false;
  }
}

export function validateDependencyGraph(dependencies: [string, string][]) {
  const graph = new DependencyGraph();
  for (const [mod, dep] of dependencies) {
    graph.addDependency(mod, dep);
  }

  const cycle = graph.detectCycles();
  if (cycle) {
    throw new Error(`Circular dependency detected: ${cycle.join(' -> ')}`);
  }

  return true;
}
