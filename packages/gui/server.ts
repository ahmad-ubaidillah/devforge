import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { listAvailablePlugins } from '../core/src/plugins/plugin-registry';
import { generateArchitectureGraph } from '../core/src/utils/graph-generator';
import { scaffold } from '../core/src/engine/scaffolder';
import { loadTemplate } from '../core/src/engine/template-loader';
import { readdirSync } from 'fs';
import { join } from 'path';

const app = new Hono();

app.use('*', cors());

// List all projects in the workspace
app.get('/api/projects', (c) => {
  // Simple heuristic: list directories in process.cwd() that have a package.json
  const dirs = readdirSync(process.cwd(), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
    
  return c.json({ projects: dirs });
});

// List available templates
app.get('/api/templates', (c) => {
  const templatesDir = join(process.cwd(), 'templates');
  const templates = readdirSync(templatesDir);
  return c.json({ templates });
});

// List available plugins
app.get('/api/plugins', async (c) => {
  const { MarketplaceService } = await import('../core/src/marketplace/marketplace-service');
  const service = new MarketplaceService();
  const template = c.req.query('template');
  
  if (template) {
    const plugins = await service.getCompatiblePlugins(template);
    return c.json({ plugins });
  }
  
  const plugins = await service.getAllPlugins();
  return c.json({ plugins });
});

// Scaffolding endpoint
app.post('/api/create', async (c) => {
  const { projectName, templateName, plugins } = await c.req.json();
  const targetDir = join(process.cwd(), projectName);
  
  try {
    await scaffold({
      projectName,
      templateName,
      targetDir,
      plugins
    });
    return c.json({ success: true, message: `Project ${projectName} created.` });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

// Graph endpoint for visualizer
app.get('/api/graph', (c) => {
  const data = generateArchitectureGraph();
  return c.json(data);
});

export default {
  port: 4000,
  fetch: app.fetch,
};
