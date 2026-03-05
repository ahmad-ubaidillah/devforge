import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { globSync } from 'glob';

export interface MigrationMergeResult {
  success: boolean;
  mergedCount: number;
  outputFile: string;
}

/**
 * MigrationConflictResolver
 * 
 * Automatically merges multiple schema migrations into a single file.
 * Useful when multiple plugins or branches introduce schema changes.
 */
export function mergeMigrations(migrationDir: string, outputFilename: string = 'migration_merged.sql'): MigrationMergeResult {
  if (!existsSync(migrationDir)) {
    throw new Error(`Migration directory not found at ${migrationDir}`);
  }

  const migrationFiles = globSync(join(migrationDir, '*.sql')).sort();
  
  if (migrationFiles.length === 0) {
    return { success: true, mergedCount: 0, outputFile: '' };
  }

  let mergedContent = `-- DevForge Auto-Merged Migration\n-- Generated at: ${new Date().toISOString()}\n\n`;
  let mergedCount = 0;

  for (const file of migrationFiles) {
    // Skip the output file itself if it already exists
    if (file.endsWith(outputFilename)) continue;

    const content = readFileSync(file, 'utf8');
    const filename = file.split('/').pop();
    
    mergedContent += `-- Source: ${filename}\n`;
    mergedContent += content.trim();
    mergedContent += '\n\n';
    mergedCount++;
  }

  const outputPath = join(migrationDir, outputFilename);
  writeFileSync(outputPath, mergedContent);

  return {
    success: true,
    mergedCount,
    outputFile: outputPath
  };
}

/**
 * Deduped Merge (Experimental)
 * 
 * Attempt to deduplicate CREATE TABLE statements.
 * For now, simple concatenation is safer as SQL execution handles order.
 */
export function resolveConflicts(sqlContent: string): string {
  // Logic to detect and resolve duplicate table definitions could go here
  // For MVP, we rely on the specific order of SQL execution
  return sqlContent;
}
