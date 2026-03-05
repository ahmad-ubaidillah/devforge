import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { loadPlugin, PluginConfig } from './plugin-loader';

export function listAvailablePlugins(): PluginConfig[] {
  const pluginsDir = join(process.cwd(), 'packages', 'plugins');
  if (!existsSync(pluginsDir)) return [];

  const pluginFolders = readdirSync(pluginsDir);
  return pluginFolders
    .map(folder => {
      const pluginPath = join(pluginsDir, folder);
      try {
        return loadPlugin(pluginPath);
      } catch (e) {
        return null;
      }
    })
    .filter((p): p is PluginConfig => p !== null);
}
