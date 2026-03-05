import { listAvailablePlugins } from '../plugins/plugin-registry';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { loadTemplate } from '../engine/template-loader';

export interface GraphData {
  nodes: { id: number | string; label: string; color: string; group?: string }[];
  edges: { from: number | string; to: number | string; label?: string }[];
}

export function generateArchitectureGraph(): GraphData {
  const nodes: GraphData['nodes'] = [
    { id: 'core', label: 'Core Engine', color: '#06b6d4', group: 'core' },
    { id: 'cli', label: 'CLI', color: '#ffffff', group: 'core' },
  ];
  const edges: GraphData['edges'] = [
    { from: 'cli', to: 'core' }
  ];

  const templatesDir = join(process.cwd(), 'templates');
  const templateList: { name: string; supportedPlugins: string[] }[] = [];

  // 1. Add Templates and track their supported plugins
  if (existsSync(templatesDir)) {
    const templates = readdirSync(templatesDir);
    templates.forEach(t => {
      const templatePath = join(templatesDir, t);
      if (existsSync(join(templatePath, 'template.config.json'))) {
        try {
          const config = loadTemplate(templatePath);
          nodes.push({ id: `t-${t}`, label: t.toUpperCase(), color: '#3b82f6', group: 'template' });
          edges.push({ from: `t-${t}`, to: 'core' });
          templateList.push({ name: t, supportedPlugins: config.supportedPlugins });
        } catch (e) {
          // Skip invalid templates
        }
      }
    });
  }

  // 2. Add Plugins and connect to templates
  const plugins = listAvailablePlugins();
  plugins.forEach(p => {
    nodes.push({ id: `p-${p.name}`, label: p.name, color: '#22c55e', group: 'plugin' });
    
    // Connect to core as a general integration
    edges.push({ from: `p-${p.name}`, to: 'core' });

    // Link plugin to templates that explicitly support it
    templateList.forEach(tpl => {
      if (tpl.supportedPlugins.includes(p.name)) {
        edges.push({ from: `p-${p.name}`, to: `t-${tpl.name}`, label: 'compatible' });
      }
    });
  });

  return { nodes, edges };
}
