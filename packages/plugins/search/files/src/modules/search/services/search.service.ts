import { MeiliSearch } from 'meilisearch';

export interface SearchDriver {
  search(index: string, query: string, options?: any): Promise<any>;
  addDocuments(index: string, documents: any[]): Promise<any>;
  deleteDocuments(index: string, documentIds: string[] | number[]): Promise<any>;
}

export class MeiliSearchDriver implements SearchDriver {
  private client: MeiliSearch;

  constructor(config: { host: string; apiKey: string }) {
    this.client = new MeiliSearch(config);
  }

  async search(index: string, query: string, options: any = {}) {
    return await this.client.index(index).search(query, options);
  }

  async addDocuments(index: string, documents: any[]) {
    return await this.client.index(index).addDocuments(documents);
  }

  async deleteDocuments(index: string, documentIds: string[] | number[]) {
    return await this.client.index(index).deleteDocuments(documentIds);
  }
}

/**
 * PostgresSearchDriver
 * Simple fallback using basic SQL pattern matching.
 */
export class PostgresSearchDriver implements SearchDriver {
  constructor(private db: any) {}

  async search(index: string, query: string, _options: any = {}) {
    // In a real implementation, this would use Drizzle's ilike or tsvector
    // For the template, we provide the architectural skeleton
    console.warn(`Postgres Search fallback for index: ${index}`);
    return {
      hits: [],
      query,
      fallback: true
    };
  }

  async addDocuments(_index: string, _documents: any[]) {
    // No-op for the simple driver, or sync to table if needed
    return { success: true };
  }

  async deleteDocuments(_index: string, _documentIds: any[]) {
    return { success: true };
  }
}

export class SearchService {
  private driver: SearchDriver;

  constructor(config: { 
    type: 'meilisearch' | 'postgres', 
    meiliConfig?: { host: string; apiKey: string },
    db?: any 
  }) {
    if (config.type === 'meilisearch' && config.meiliConfig) {
      this.driver = new MeiliSearchDriver(config.meiliConfig);
    } else {
      this.driver = new PostgresSearchDriver(config.db);
    }
  }

  async search(index: string, query: string, options: any = {}) {
    return await this.driver.search(index, query, options);
  }

  async addDocuments(index: string, documents: any[]) {
    return await this.driver.addDocuments(index, documents);
  }

  async deleteDocuments(index: string, documentIds: any[]) {
    return await this.driver.deleteDocuments(index, documentIds);
  }
}
