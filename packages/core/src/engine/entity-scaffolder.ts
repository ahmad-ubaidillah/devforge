import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

export class EntityScaffolder {
  static scaffold(projectDir: string, entityName: string) {
    const nameLower = entityName.toLowerCase();
    const nameCamel = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    
    const baseDir = join(projectDir, 'src', 'modules', nameLower);
    
    const dirs = [
      baseDir,
      join(baseDir, 'routes'),
      join(baseDir, 'services'),
      join(baseDir, 'repositories'),
      join(baseDir, 'validators'),
    ];

    dirs.forEach(d => {
      if (!existsSync(d)) mkdirSync(d, { recursive: true });
    });

    // 1. Validator
    const validatorCode = `import { z } from 'zod';\n\nexport const ${nameLower}Schema = z.object({\n  id: z.string().optional(),\n  name: z.string(),\n  createdAt: z.date().optional(),\n});\n\nexport type ${nameCamel} = z.infer<typeof ${nameLower}Schema>;\n`;
    writeFileSync(join(baseDir, 'validators', `${nameLower}.validator.ts`), validatorCode);

    // 2. Repository
    const repoCode = `import { ${nameCamel} } from '../validators/${nameLower}.validator';\n\nexport class ${nameCamel}Repository {\n  async findById(id: string): Promise<${nameCamel} | null> {\n    return null;\n  }\n\n  async create(data: ${nameCamel}): Promise<${nameCamel}> {\n    return { ...data, id: crypto.randomUUID(), createdAt: new Date() };\n  }\n}\n`;
    writeFileSync(join(baseDir, 'repositories', `${nameLower}.repository.ts`), repoCode);

    // 3. Service
    const serviceCode = `import { ${nameCamel}Repository } from '../repositories/${nameLower}.repository';\nimport { ${nameCamel} } from '../validators/${nameLower}.validator';\n\nexport class ${nameCamel}Service {\n  private repo = new ${nameCamel}Repository();\n\n  async get${nameCamel}(id: string) {\n    return this.repo.findById(id);\n  }\n\n  async create${nameCamel}(data: ${nameCamel}) {\n    return this.repo.create(data);\n  }\n}\n`;
    writeFileSync(join(baseDir, 'services', `${nameLower}.service.ts`), serviceCode);

    // 4. Routes
    const routeCode = `import { Hono } from 'hono';\nimport { ${nameCamel}Service } from '../services/${nameLower}.service';\nimport { zValidator } from '@hono/zod-validator';\nimport { ${nameLower}Schema } from '../validators/${nameLower}.validator';\n\nexport const ${nameLower}Routes = new Hono();\nconst service = new ${nameCamel}Service();\n\n${nameLower}Routes.get('/:id', async (c) => {\n  const item = await service.get${nameCamel}(c.req.param('id'));\n  return item ? c.json(item) : c.notFound();\n});\n\n${nameLower}Routes.post('/', zValidator('json', ${nameLower}Schema), async (c) => {\n  const body = c.req.valid('json');\n  const item = await service.create${nameCamel}(body);\n  return c.json(item);\n});\n`;
    writeFileSync(join(baseDir, 'routes', `${nameLower}.routes.ts`), routeCode);

    return { baseDir };
  }
}
