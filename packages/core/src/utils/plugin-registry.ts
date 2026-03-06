import fs from 'fs-extra';
import { join } from 'path';
import { homedir } from 'os';
import axios from 'axios';
import AdmZip from 'adm-zip';
import { ConfigManager } from './config-manager';

export interface PluginMetadata {
  name: string;
  version: string;
  description: string;
  downloadUrl: string;
}

export class PluginRegistry {
  private static REGISTRY_URL = 'https://raw.githubusercontent.com/ahmad-ubaidillah/devforge-registry/main/plugins.json';
  private static CACHE_DIR = join(homedir(), '.devforge', 'cache', 'plugins');

  private static ensureCache() {
    if (!fs.existsSync(this.CACHE_DIR)) {
      fs.mkdirSync(this.CACHE_DIR, { recursive: true });
    }
  }

  static async fetchAvailablePlugins(): Promise<PluginMetadata[]> {
    try {
      const response = await axios.get(this.REGISTRY_URL);
      return response.data.plugins;
    } catch (error) {
      console.warn('[REGISTRY] Failed to fetch remote registry. Falling back to local/cached plugins.');
      return [];
    }
  }

  static async downloadPlugin(pluginName: string): Promise<string> {
    this.ensureCache();
    const plugins = await this.fetchAvailablePlugins();
    const plugin = plugins.find(p => p.name === pluginName);

    if (!plugin) {
      throw new Error(`Plugin "${pluginName}" not found in the federated registry.`);
    }

    const pluginDir = join(this.CACHE_DIR, pluginName);
    
    // Check if we already have it cached and it's up to date (simplified for POC)
    if (fs.existsSync(pluginDir)) {
      return pluginDir;
    }

    console.log(`[REGISTRY] Downloading ${pluginName} from ${plugin.downloadUrl}...`);
    
    const response = await axios.get(plugin.downloadUrl, { responseType: 'arraybuffer' });
    const zip = new AdmZip(Buffer.from(response.data));
    zip.extractAllTo(pluginDir, true);

    return pluginDir;
  }
}
