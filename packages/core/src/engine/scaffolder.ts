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
  withAgents: z.boolean().optional().default(false),
  agentKey: z.string().optional(),
});

export type ScaffoldOptions = z.infer<typeof scaffoldSchema>;
export type ScaffoldInput = z.input<typeof scaffoldSchema>;

export async function scaffold(options: ScaffoldInput) {
  const result = scaffoldSchema.safeParse(options);
  if (!result.success) {
    throw new DevForgeError('Invalid scaffold options', 'INVALID_INPUT', result.error.format());
  }

  const { projectName, templateName, targetDir, plugins, withAgents, agentKey } = result.data;

  // 1. Resolve template path
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

  // 4. Compose template (Normal Scaffolding)
  composeTemplate(templatePath, targetDir, {
    projectName,
    plugins
  });

  // 5. Modular Agent Implementation (Premium Feature)
  if (withAgents) {
    // Security Check: Verify Agent Key
    // DevForge Master Key: DF-AGENT-2026-X (for demo)
    const SECRET_KEY = process.env.DEVFORGE_AGENT_KEY;
    
    if (agentKey !== SECRET_KEY) {
      throw new DevForgeError('Unauthorized: Invalid Agent Activation Key.', 'AUTH_FAILED');
    }

    const agentsSrcPath = join(process.cwd(), '.agents');
    const agentsDestPath = join(targetDir, '.agents');

    if (existsSync(agentsSrcPath)) {
      const { cpSync } = await import('fs');
      cpSync(agentsSrcPath, agentsDestPath, { recursive: true });
    } else {
      console.warn('⚠️ Warning: .agents directory not found in core. Skipping agent injection.');
    }
  }

  // 6. Install plugins
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
