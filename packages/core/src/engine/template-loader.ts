import { z } from 'zod';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

export const TemplateConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  stack: z.object({
    runtime: z.string(),
    backend: z.string().optional(),
    frontend: z.string().optional(),
    database: z.string().optional(),
    css: z.string().optional(),
    interactivity: z.string().optional(),
  }),
  supportedPlugins: z.array(z.string()),
});

export type TemplateConfig = z.infer<typeof TemplateConfigSchema>;

export function loadTemplate(templatePath: string): TemplateConfig {
  const configPath = join(templatePath, 'template.config.json');

  if (!existsSync(configPath)) {
    throw new Error(`Template config not found at ${configPath}`);
  }

  try {
    const rawConfig = JSON.parse(readFileSync(configPath, 'utf8'));
    return TemplateConfigSchema.parse(rawConfig);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid template configuration at ${configPath}: ${error.message}`);
    }
    throw new Error(`Failed to parse template config at ${configPath}: ${error.message}`);
  }
}
