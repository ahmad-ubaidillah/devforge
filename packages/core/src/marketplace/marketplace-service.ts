import { listAvailablePlugins } from '../plugins/plugin-registry';
import { PluginConfig } from '../plugins/plugin-loader';

/**
 * MarketplaceService
 * 
 * Orchestrates plugin discovery and compatibility matching for the DevForge platform.
 */
export class MarketplaceService {
  /**
   * Retrieves all plugins available in the local registry.
   */
  async getAllPlugins(): Promise<PluginConfig[]> {
    return listAvailablePlugins();
  }

  /**
   * Filters plugins by template compatibility.
   * @param templateName The name of the template (e.g., 'saas', 'cms')
   */
  async getCompatiblePlugins(templateName: string): Promise<PluginConfig[]> {
    const allPlugins = await this.getAllPlugins();
    return allPlugins.filter(plugin => 
      plugin.compatibleTemplates.includes(templateName) || 
      plugin.compatibleTemplates.includes('*')
    );
  }

  /**
   * Searches for plugins by name or description.
   */
  async searchPlugins(query: string): Promise<PluginConfig[]> {
    const allPlugins = await this.getAllPlugins();
    const normalizedQuery = query.toLowerCase();
    
    return allPlugins.filter(plugin => 
      plugin.name.toLowerCase().includes(normalizedQuery) || 
      plugin.description.toLowerCase().includes(normalizedQuery)
    );
  }

  /**
   * Gets a specific plugin by name.
   */
  async getPluginByName(name: string): Promise<PluginConfig | null> {
    const allPlugins = await this.getAllPlugins();
    return allPlugins.find(p => p.name === name) || null;
  }
}
