---
name: research-codebase
description: Automated codebase analysis to understand existing patterns, conventions, and architecture. Use when planning new features or understanding unfamiliar code areas.
---

# Codebase Research Skill

Systematically analyze the repository to extract patterns, conventions, and architecture insights before planning or implementing changes.

## Quick Start

Before planning any feature, run a codebase scan to understand what already exists.

## Research Process

### 1. Project Structure Scan

```bash
# Get the overall project layout
find . -type f -name "*.ts" -not -path "*/node_modules/*" | head -50
find . -type f -name "*.json" -not -path "*/node_modules/*" | head -20
```

**Extract:**

- Package organization (monorepo structure, workspace layout)
- Module naming patterns
- File naming conventions
- Directory structure patterns

### 2. Convention Discovery

Analyze existing code for patterns:

```bash
# Find service implementations
find . -name "*.service.ts" -not -path "*/node_modules/*"

# Find route definitions
find . -name "*.routes.ts" -not -path "*/node_modules/*"

# Find schema definitions
find . -name "*.schema.ts" -not -path "*/node_modules/*"

# Find test files
find . -name "*.test.ts" -not -path "*/node_modules/*"
```

**Document:**

- Naming conventions (camelCase, kebab-case for files, PascalCase for classes)
- File organization patterns (co-located tests, separate test directory)
- Import patterns (barrel exports, direct imports)
- Error handling patterns (try-catch placement, error types)

### 3. Dependency Analysis

```bash
# Check package.json for tech stack
cat package.json | grep -A5 '"dependencies"'

# Check workspace packages
ls packages/*/package.json 2>/dev/null
```

**Document:**

- Core framework (Hono, Astro, etc.)
- ORM/Database (Drizzle, PostgreSQL, etc.)
- Testing framework (Vitest)
- Build tools (Vite, tsup, etc.)

### 4. Pattern Reference Extraction

For the feature being planned, find the **most similar existing implementation**:

```bash
# Find similar modules
grep -r "{feature_keyword}" --include="*.ts" -l
grep -r "{feature_keyword}" --include="*.md" -l
```

**Output the closest matching pattern** with file paths and line numbers. This becomes the reference implementation for the plan.

### 5. Configuration & Rules Check

```bash
# Check for project rules
cat .agents/rules/*.md 2>/dev/null | head
cat CLAUDE.md 2>/dev/null
cat .editorconfig 2>/dev/null
```

## Output Format

```markdown
### Codebase Research Summary

**Project:** {name} ({monorepo|single-package})
**Stack:** {framework} + {orm} + {test framework}
**Architecture:** {layered|microservices|modular monolith}

**Conventions Found:**

- File naming: {pattern}
- Module structure: {pattern}
- Error handling: {pattern}
- Testing: {pattern}

**Most Similar Existing Implementation:**

- {file_path}:{line} — {description}
- {file_path}:{line} — {description}

**Rules & Constraints:**

- {rule from .agents/rules/}
- {constraint from CLAUDE.md}

**Recommendations for This Feature:**

1. Follow the pattern in {reference_file}
2. Place new files in {directory}
3. Use {existing_utility} for {common_task}
```
