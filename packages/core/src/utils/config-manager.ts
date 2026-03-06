import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export interface AppConfig {
  tokenBudget: number; // Max tokens per day/session
  costThreshold: number; // USD per day alert
  defaultFilterLevel: 'none' | 'minimal' | 'aggressive';
  semanticSyncOnCommit: boolean;
}

export class ConfigManager {
  private static STORAGE_PATH = join(homedir(), '.devforge', 'config.json');

  private static DEFAULT_CONFIG: AppConfig = {
    tokenBudget: 500000, // 500k tokens ≈ $0.50 - $2.50 depending on model
    costThreshold: 1.0, // $1 per day
    defaultFilterLevel: 'minimal',
    semanticSyncOnCommit: true,
  };

  private static ensureStorage() {
    const dir = join(homedir(), '.devforge');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    if (!existsSync(this.STORAGE_PATH)) {
      writeFileSync(this.STORAGE_PATH, JSON.stringify(this.DEFAULT_CONFIG, null, 2));
    }
  }

  static getConfig(): AppConfig {
    this.ensureStorage();
    try {
      return { ...this.DEFAULT_CONFIG, ...JSON.parse(readFileSync(this.STORAGE_PATH, 'utf-8')) };
    } catch {
      return this.DEFAULT_CONFIG;
    }
  }

  static updateConfig(updates: Partial<AppConfig>) {
    this.ensureStorage();
    const current = this.getConfig();
    const updated = { ...current, ...updates };
    writeFileSync(this.STORAGE_PATH, JSON.stringify(updated, null, 2));
    return updated;
  }
}
