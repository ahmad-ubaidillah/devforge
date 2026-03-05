import { z } from 'zod';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

export const PluginConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  compatibleTemplates: z.array(z.string()),
  dependencies: z.array(z.string()).default([]),
  packageDependencies: z.record(z.string()).default({}),
  packageDevDependencies: z.record(z.string()).default({}),
});

export type PluginConfig = z.infer<typeof PluginConfigSchema>;

export function loadPlugin(pluginPath: string): PluginConfig {
  const configPath = join(pluginPath, 'plugin.config.json');

  if (!existsSync(configPath)) {
    throw new Error(`Plugin config not found at ${configPath}`);
  }

  try {
    const rawConfig = JSON.parse(readFileSync(configPath, 'utf8'));
    return PluginConfigSchema.parse(rawConfig);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid plugin configuration at ${configPath}: ${error.message}`);
    }
    throw new Error(`Failed to parse plugin config at ${configPath}: ${error.message}`);
  }
}
