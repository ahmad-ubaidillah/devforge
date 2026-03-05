import { describe, it, expect } from 'vitest';
import { MarketplaceService } from '../../../packages/core/src/marketplace/marketplace-service';

describe('Task 13: Marketplace Discovery API Smoke Test', () => {
  const service = new MarketplaceService();

  it('should list available plugins', async () => {
    const plugins = await service.getAllPlugins();
    expect(Array.isArray(plugins)).toBe(true);
    // There should be at least the plugins we created (auth, search, analytics, cms)
    expect(plugins.length).toBeGreaterThanOrEqual(4);
  });

  it('should filter by template compatibility', async () => {
    const saasPlugins = await service.getCompatiblePlugins('saas');
    const authPlugin = saasPlugins.find(p => p.name === 'auth');
    expect(authPlugin).toBeDefined();
    expect(authPlugin?.compatibleTemplates).toContain('saas');
  });

  it('should search plugins by name/description', async () => {
    const results = await service.searchPlugins('authentication');
    const authPlugin = results.find(p => p.name === 'auth');
    expect(authPlugin).toBeDefined();
  });

  it('should return null for non-existent plugin', async () => {
    const plugin = await service.getPluginByName('ghost-plugin');
    expect(plugin).toBeNull();
  });
});
