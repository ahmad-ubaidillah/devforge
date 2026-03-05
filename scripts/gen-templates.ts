import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const templates = [
  { name: 'marketplace', modules: ['products', 'orders', 'vendors'] },
  { name: 'ai_wrapper', modules: ['prompts', 'usage'] },
  { name: 'booking', modules: ['calendar', 'availability'] },
  { name: 'finance', modules: ['transactions', 'reports'] },
  { name: 'crm', modules: ['contacts', 'pipelines'] }
];

const baseCwd = '/Users/user/Documents/New Project/DevForge';

for (const t of templates) {
  const tDir = join(baseCwd, 'templates', t.name, 'files');
  if (!existsSync(tDir)) mkdirSync(tDir, { recursive: true });

  // package.json
  const pkg = {
    name: `{{PROJECT_NAME}}-${t.name}`,
    version: "1.0.0",
    type: "module",
    scripts: {
      "dev": "bun run --hot src/app.ts",
      "start": "bun run src/app.ts",
      "build": "bun build ./src/app.ts --outdir ./dist"
    },
    dependencies: {
      "hono": "latest",
      "zod": "latest",
      "drizzle-orm": "latest",
      "postgres": "latest"
    }
  };
  writeFileSync(join(tDir, 'package.json'), JSON.stringify(pkg, null, 2));

  // src/app.ts
  const appTs = `import { Hono } from 'hono';
import { logger } from 'hono/logger';
${t.modules.map(m => `import { ${m}Routes } from './modules/${m}/${m}.routes';`).join('\n')}

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to {{PROJECT_NAME}} ${t.name.toUpperCase()} - Powered by DevForge',
    status: 'running'
  });
});

${t.modules.map(m => `app.route('/${m}', ${m}Routes);`).join('\n')}

export default {
  port: 3000,
  fetch: app.fetch,
};`;
  if (!existsSync(join(tDir, 'src'))) mkdirSync(join(tDir, 'src'), { recursive: true });
  writeFileSync(join(tDir, 'src', 'app.ts'), appTs);

  // modules
  for (const m of t.modules) {
    const mDir = join(tDir, 'src', 'modules', m);
    if (!existsSync(mDir)) mkdirSync(mDir, { recursive: true });
    
    const routesContent = `import { Hono } from 'hono';

export const ${m}Routes = new Hono();

${m}Routes.get('/', (c) => {
  return c.json({ data: [], module: '${m}' });
});

${m}Routes.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ message: '${m} created', data: body });
});`;
    writeFileSync(join(mDir, `${m}.routes.ts`), routesContent);
  }

  // README
  const readme = `# {{PROJECT_NAME}}
  
Built with DevForge CLI. Template: ${t.name}.
`;
  writeFileSync(join(tDir, 'README.md'), readme);
}
