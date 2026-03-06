import { z } from 'zod';

// For the plugin's own registry service if we expand it
export const pluginRegistryItemSchema = z.object({
  name: z.string(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  description: z.string().optional(),
});

export type PluginRegistryItem = z.infer<typeof pluginRegistryItemSchema>;
