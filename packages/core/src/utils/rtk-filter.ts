import { readFileSync } from 'fs';
import { extname } from 'path';

export enum FilterLevel {
  None = 'none',
  Minimal = 'minimal',
  Aggressive = 'aggressive',
}

export enum Language {
  Rust = 'rust',
  Python = 'python',
  JavaScript = 'javascript',
  TypeScript = 'typescript',
  Go = 'go',
  C = 'c',
  Cpp = 'cpp',
  Java = 'java',
  Ruby = 'ruby',
  Shell = 'shell',
  Unknown = 'unknown',
}

interface CommentPatterns {
  line?: string;
  blockStart?: string;
  blockEnd?: string;
  docLine?: string;
  docBlockStart?: string;
}

const LANGUAGE_PATTERNS: Record<Language, CommentPatterns> = {
  [Language.Rust]: {
    line: '//',
    blockStart: '/*',
    blockEnd: '*/',
    docLine: '///',
    docBlockStart: '/**',
  },
  [Language.Python]: {
    line: '#',
    blockStart: '"""',
    blockEnd: '"""',
    docBlockStart: '"""',
  },
  [Language.JavaScript]: {
    line: '//',
    blockStart: '/*',
    blockEnd: '*/',
    docBlockStart: '/**',
  },
  [Language.TypeScript]: {
    line: '//',
    blockStart: '/*',
    blockEnd: '*/',
    docBlockStart: '/**',
  },
  [Language.Go]: {
    line: '//',
    blockStart: '/*',
    blockEnd: '*/',
    docBlockStart: '/**',
  },
  [Language.C]: {
    line: '//',
    blockStart: '/*',
    blockEnd: '*/',
    docBlockStart: '/**',
  },
  [Language.Cpp]: {
    line: '//',
    blockStart: '/*',
    blockEnd: '*/',
    docBlockStart: '/**',
  },
  [Language.Java]: {
    line: '//',
    blockStart: '/*',
    blockEnd: '*/',
    docBlockStart: '/**',
  },
  [Language.Ruby]: {
    line: '#',
    blockStart: '=begin',
    blockEnd: '=end',
  },
  [Language.Shell]: {
    line: '#',
  },
  [Language.Unknown]: {
    line: '//',
    blockStart: '/*',
    blockEnd: '*/',
  },
};

const IMPORT_PATTERN = /^(use |import |from |require\(|#include)/;
const FUNC_SIGNATURE = /^(pub\s+)?(async\s+)?(fn|def|function|func|class|struct|enum|trait|interface|type)\s+\w+/;

export class RTKFilter {
  static detectLanguage(filePath: string): Language {
    const ext = extname(filePath).toLowerCase().slice(1);
    switch (ext) {
      case 'rs': return Language.Rust;
      case 'py': case 'pyw': return Language.Python;
      case 'js': case 'mjs': case 'cjs': return Language.JavaScript;
      case 'ts': case 'tsx': return Language.TypeScript;
      case 'go': return Language.Go;
      case 'c': case 'h': return Language.C;
      case 'cpp': case 'cc': case 'cxx': case 'hpp': case 'hh': return Language.Cpp;
      case 'java': return Language.Java;
      case 'rb': return Language.Ruby;
      case 'sh': case 'bash': case 'zsh': return Language.Shell;
      default: return Language.Unknown;
    }
  }

  static filter(content: string, lang: Language, level: FilterLevel): string {
    if (level === FilterLevel.None) return content;

    const minimal = this.applyMinimal(content, lang);
    if (level === FilterLevel.Minimal) return minimal;

    return this.applyAggressive(minimal, lang);
  }

  private static applyMinimal(content: string, lang: Language): string {
    const patterns = LANGUAGE_PATTERNS[lang];
    const lines = content.split('\n');
    const result: string[] = [];
    let inBlockComment = false;
    let inDocstring = false;

    for (const line of lines) {
      const trimmed = line.trim();

      // Handle block comments
      if (patterns.blockStart && patterns.blockEnd) {
        if (!inDocstring && trimmed.includes(patterns.blockStart) && 
            (!patterns.docBlockStart || !trimmed.startsWith(patterns.docBlockStart))) {
          inBlockComment = true;
        }
        if (inBlockComment) {
          if (trimmed.includes(patterns.blockEnd)) {
            inBlockComment = false;
          }
          continue;
        }
      }

      // Handle Python docstrings
      if (lang === Language.Python && trimmed.startsWith('"""')) {
        inDocstring = !inDocstring;
        result.push(line);
        continue;
      }

      if (inDocstring) {
        result.push(line);
        continue;
      }

      // Skip single-line comments (keep docs)
      if (patterns.line && trimmed.startsWith(patterns.line)) {
        if (patterns.docLine && trimmed.startsWith(patterns.docLine)) {
          result.push(line);
        }
        continue;
      }

      result.push(line);
    }

    // Normalize blank lines (max 2)
    return result.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  private static applyAggressive(minimalContent: string, lang: Language): string {
    const lines = minimalContent.split('\n');
    const result: string[] = [];
    let braceDepth = 0;
    let inImplBody = false;

    for (const line of lines) {
      const trimmed = line.trim();

      // Keep imports
      if (IMPORT_PATTERN.test(trimmed)) {
        result.push(line);
        continue;
      }

      // Keep signatures
      if (FUNC_SIGNATURE.test(trimmed)) {
        result.push(line);
        inImplBody = true;
        braceDepth = 0;
        continue;
      }

      if (inImplBody) {
        const openBraces = (trimmed.match(/{/g) || []).length;
        const closeBraces = (trimmed.match(/}/g) || []).length;
        braceDepth += openBraces;
        braceDepth -= closeBraces;

        // Keep opening/closing braces
        if (braceDepth <= 1 && (trimmed === '{' || trimmed === '}' || trimmed.endsWith('{'))) {
          result.push(line);
        }

        if (braceDepth <= 0) {
          inImplBody = false;
          if (trimmed !== '' && trimmed !== '}') {
            result.push('    // ... implementation');
          }
        }
        continue;
      }

      // Keep type/const defs
      if (/^(const|static|let|pub const|pub static)\s+/.test(trimmed)) {
        result.push(line);
      }
    }

    return result.join('\n').trim();
  }

  static smartTruncate(content: string, maxLines: number): string {
    const lines = content.split('\n');
    if (lines.length <= maxLines) return content;

    const result: string[] = [];
    let keptLines = 0;
    let skippedSection = false;

    for (const line of lines) {
      const trimmed = line.trim();
      const isImportant = FUNC_SIGNATURE.test(trimmed) || 
                          IMPORT_PATTERN.test(trimmed) ||
                          trimmed.startsWith('pub ') ||
                          trimmed.startsWith('export ') ||
                          trimmed === '}' || trimmed === '{';

      if (isImportant || keptLines < maxLines / 2) {
        if (skippedSection) {
          result.push(`    // ... ${lines.length - keptLines} lines omitted`);
          skippedSection = false;
        }
        result.push(line);
        keptLines++;
      } else {
        skippedSection = true;
      }

      if (keptLines >= maxLines - 1) break;
    }

    if (skippedSection || keptLines < lines.length) {
      result.push(`// ... ${lines.length - keptLines} more lines (total: ${lines.length})`);
    }

    return result.join('\n');
  }
}
