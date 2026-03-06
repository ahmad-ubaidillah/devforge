import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

import { ConfigManager } from './config-manager';

export interface TokenRecord {
  timestamp: string;
  command: string;
  originalTokens: number;
  filteredTokens: number;
  savings: number;
  percentage: number;
}

export class TokenTracker {
  private static STORAGE_PATH = join(homedir(), '.devforge', 'token-metrics.json');

  private static ensureStorage() {
    const dir = join(homedir(), '.devforge');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    if (!existsSync(this.STORAGE_PATH)) {
      writeFileSync(this.STORAGE_PATH, JSON.stringify([]));
    }
  }


  static track(command: string, originalContent: string, filteredContent: string) {
    this.ensureStorage();
    const config = ConfigManager.getConfig();
    
    // Very rough token estimation (1 token ≈ 4 chars)
    const originalTokens = Math.ceil(originalContent.length / 4);
    const filteredTokens = Math.ceil(filteredContent.length / 4);
    const savings = originalTokens - filteredTokens;
    const percentage = originalTokens > 0 ? (savings / originalTokens) * 100 : 0;

    const record: TokenRecord = {
      timestamp: new Date().toISOString(),
      command,
      originalTokens,
      filteredTokens,
      savings,
      percentage
    };

    const history = JSON.parse(readFileSync(this.STORAGE_PATH, 'utf-8'));
    history.push(record);
    
    // Budget check logic
    const dailySpend = history
      .filter((r: TokenRecord) => r.timestamp.startsWith(new Date().toISOString().split('T')[0]))
      .reduce((sum: number, r: TokenRecord) => sum + r.filteredTokens, 0);

    if (dailySpend > config.tokenBudget) {
      console.warn(`[COST GUARDRAIL] Warning: Daily token budget exceeded! (Spent: ${dailySpend}, Budget: ${config.tokenBudget})`);
    }

    writeFileSync(this.STORAGE_PATH, JSON.stringify(history.slice(-1000), null, 2)); // Keep last 1000
    
    return record;
  }

  static getStats() {
    this.ensureStorage();
    const config = ConfigManager.getConfig();
    const history: TokenRecord[] = JSON.parse(readFileSync(this.STORAGE_PATH, 'utf-8'));
    
    const dailySpend = history
      .filter((r: TokenRecord) => r.timestamp.startsWith(new Date().toISOString().split('T')[0]))
      .reduce((sum: number, r: TokenRecord) => sum + r.filteredTokens, 0);

    const totalOriginal = history.reduce((sum, r) => sum + r.originalTokens, 0);
    const totalFiltered = history.reduce((sum, r) => sum + r.filteredTokens, 0);
    const totalSavings = totalOriginal - totalFiltered;
    const avgPercentage = history.length > 0 
      ? history.reduce((sum, r) => sum + r.percentage, 0) / history.length 
      : 0;

    return {
      history,
      totals: {
        original: totalOriginal,
        filtered: totalFiltered,
        savings: totalSavings,
        percentage: avgPercentage,
        dailySpend,
        dailyBudget: config.tokenBudget,
        dailyRemaining: config.tokenBudget - dailySpend
      }
    };
  }
}
