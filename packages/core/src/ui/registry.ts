import { INITIAL_COMPONENTS } from './component-data';

export interface UIComponent {
  name: string;
  description: string;
  framework: 'solid' | 'react' | 'preact' | 'astro';
  dependencies: string[];
  files: {
    path: string;
    content: string;
  }[];
}

export class UIRegistryService {
  private components: Map<string, UIComponent[]> = new Map();

  constructor() {
    this.initializeComponents();
  }

  private initializeComponents() {
    INITIAL_COMPONENTS.forEach(component => {
      this.registerComponent(component);
    });
  }

  public registerComponent(component: UIComponent) {
    const existing = this.components.get(component.name) || [];
    // Replace if same framework exists, otherwise append
    const filtered = existing.filter(c => c.framework !== component.framework);
    this.components.set(component.name, [...filtered, component]);
  }

  public getComponent(name: string, framework?: UIComponent['framework']): UIComponent | null {
    const list = this.components.get(name);
    if (!list || list.length === 0) return null;
    
    if (framework) {
      return list.find(c => c.framework === framework) || null;
    }
    
    // Default to first available if framework not specified
    return list[0];
  }

  public getAllComponents(): { name: string, frameworks: string[], description: string }[] {
    const result = [];
    for (const [name, list] of this.components.entries()) {
      if (list.length > 0) {
        result.push({
          name,
          frameworks: list.map(c => c.framework),
          description: list[0].description
        });
      }
    }
    return result;
  }
}

export const uiRegistry = new UIRegistryService();
