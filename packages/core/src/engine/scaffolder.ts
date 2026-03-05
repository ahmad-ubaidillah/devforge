import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { loadTemplate } from './template-loader';
import { composeTemplate } from './template-composer';
import { z } from 'zod';
import { DevForgeError } from '../core/errors';

export const scaffoldSchema = z.object({
  projectName: z.string().min(1),
  templateName: z.string().min(1),
  targetDir: z.string().min(1),
  plugins: z.array(z.string()).default([]),
});

export type ScaffoldOptions = z.infer<typeof scaffoldSchema>;

export async function scaffold(options: ScaffoldOptions) {
  const result = scaffoldSchema.safeParse(options);
  if (!result.success) {
    throw new DevForgeError('Invalid scaffold options', 'INVALID_INPUT', result.error.format());
  }

  const { projectName, templateName, targetDir, plugins } = result.data;

  // 1. Resolve template path (assuming templates are in the root templates directory)
  // In a real app, this might resolve from the package's node_modules or a global cache
  const templatePath = join(process.cwd(), 'templates', templateName);

  if (!existsSync(templatePath)) {
    throw new Error(`Template "${templateName}" not found at ${templatePath}`);
  }

  // 2. Load and validate template configuration
  const config = loadTemplate(templatePath);

  // 3. Ensure target directory exists
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  // 4. Compose template
  composeTemplate(templatePath, targetDir, {
    projectName,
    plugins
  });

  // 5. Install plugins
  const { installPlugin } = await import('../plugins/plugin-installer');
  for (const pluginName of plugins) {
    await installPlugin(pluginName, targetDir, { projectName });
  }

  return {
    success: true,
    config,
    targetDir
  };
}
