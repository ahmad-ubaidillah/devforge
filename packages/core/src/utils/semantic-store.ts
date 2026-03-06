import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export interface Fact {
  id: string;
  category: 'architecture' | 'feature' | 'decision' | 'preference' | 'state';
  content: string;
  lastUpdated: string;
  sourceTurn?: number;
}

export class SemanticStore {
  private static STORAGE_PATH = join(homedir(), '.devforge', 'semantic-memory.json');

  private static ensureStorage() {
    const dir = join(homedir(), '.devforge');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    if (!existsSync(this.STORAGE_PATH)) {
      writeFileSync(this.STORAGE_PATH, JSON.stringify({ facts: [] }));
    }
  }

  static addFact(category: Fact['category'], content: string, sourceTurn?: number) {
    this.ensureStorage();
    const data = JSON.parse(readFileSync(this.STORAGE_PATH, 'utf-8'));
    
    // Simple deduplication - if same content exists in same category, update its timestamp
    const existing = data.facts.find((f: Fact) => f.category === category && f.content === content);
    if (existing) {
      existing.lastUpdated = new Date().toISOString();
    } else {
      data.facts.push({
        id: Math.random().toString(36).substr(2, 9),
        category,
        content,
        lastUpdated: new Date().toISOString(),
        sourceTurn
      });
    }

    writeFileSync(this.STORAGE_PATH, JSON.stringify(data, null, 2));
  }

  static getFacts(category?: Fact['category']): Fact[] {
    this.ensureStorage();
    const data = JSON.parse(readFileSync(this.STORAGE_PATH, 'utf-8'));
    if (category) {
      return data.facts.filter((f: Fact) => f.category === category);
    }
    return data.facts;
  }

  static pruneMemory() {
    // Keep only most relevant facts if storage grows too large
  }
}
