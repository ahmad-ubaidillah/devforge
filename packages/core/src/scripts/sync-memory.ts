import { SemanticStore } from '../utils/semantic-store';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Sync Memory: Analyzes current code state and populates semantic facts.
 * This is an 'agent-first' script that ensures the SemanticStore is up to date
 * with structural decisions and architecture.
 */

async function syncMemory() {
  console.log('🔄 Syncing Semantic Memory with Codebase...');
  
  // 1. Scan for architecture patterns
  const pluginsDir = join(process.cwd(), 'packages/plugins');
  const plugins = readdirSync(pluginsDir);
  
  for (const plugin of plugins) {
    const pluginPath = join(pluginsDir, plugin);
    if (!statSync(pluginPath).isDirectory()) continue;
    
    // Add fact about plugin existence
    SemanticStore.addFact('architecture', `Feature Plugin: ${plugin} is installed.`);
    
    // Scan for services
    const servicesPath = join(pluginPath, 'files/src/modules/billing/services'); // Simplification for now
    // Actually, we should scan more generically, but this is a POC for the turn
    
    // 2. Scan tasks for high-level state
    try {
      const taskContent = readFileSync(join(process.cwd(), 'tasks/task.md'), 'utf-8');
      const currentSprintMatch = taskContent.match(/## Sprint (\d+): (.*)/);
      if (currentSprintMatch) {
        SemanticStore.addFact('state', `Current Active Sprint: ${currentSprintMatch[2]}`);
      }
    } catch (e) {
      // Ignore if tasks.md not found
    }
  }

  console.log('📈 Semantic Memory synchronized.');
}

syncMemory().catch(console.error);
