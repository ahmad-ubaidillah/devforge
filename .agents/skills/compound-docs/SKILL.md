---
name: compound-docs
description: Capture solved problems as categorized documentation with YAML frontmatter for searchability. Use when a non-trivial problem has been solved and needs to be documented for future reference.
---

# Compound Docs Skill

Automatically document solved problems to build a searchable institutional knowledge base organized by problem category.

## Quick Start

After solving a non-trivial problem, create documentation using the resolution template:

```bash
mkdir -p docs/solutions/{category}
# Write documentation to docs/solutions/{category}/{filename}.md
```

## Documentation Structure

Each solution document follows this structure:

### YAML Frontmatter (Required)

```yaml
---
module: "{Package or module name}"
date: "YYYY-MM-DD"
problem_type: "{see enum below}"
component: "{see enum below}"
symptoms:
  - "Observable symptom 1 — exact error message"
  - "Observable symptom 2 — behavior description"
root_cause: "{see enum below}"
resolution_type: "{see enum below}"
severity: "{critical|high|medium|low}"
tags: [keyword1, keyword2]
---
```

### Enum Values

**problem_type:** `build_error` | `test_failure` | `runtime_error` | `performance_issue` | `database_issue` | `security_issue` | `ui_bug` | `integration_issue` | `logic_error` | `config_error` | `dependency_issue`

**component:** `api_routes` | `service_layer` | `repository` | `middleware` | `database_schema` | `ui_component` | `cli_command` | `plugin_system` | `scaffold_engine` | `auth_module` | `search_module` | `queue_worker` | `config` | `testing`

**root_cause:** `missing_validation` | `wrong_import` | `scope_issue` | `async_timing` | `config_error` | `logic_error` | `missing_index` | `type_mismatch` | `dependency_conflict` | `missing_middleware` | `schema_drift` | `race_condition`

**resolution_type:** `code_fix` | `config_change` | `schema_migration` | `dependency_update` | `test_fix` | `environment_setup` | `refactor` | `documentation_update`

### Category Mapping

`problem_type` determines the output directory:

| problem_type        | Directory                            |
| ------------------- | ------------------------------------ |
| `build_error`       | `docs/solutions/build-errors/`       |
| `test_failure`      | `docs/solutions/test-failures/`      |
| `runtime_error`     | `docs/solutions/runtime-errors/`     |
| `performance_issue` | `docs/solutions/performance-issues/` |
| `database_issue`    | `docs/solutions/database-issues/`    |
| `security_issue`    | `docs/solutions/security-issues/`    |
| `ui_bug`            | `docs/solutions/ui-bugs/`            |
| `integration_issue` | `docs/solutions/integration-issues/` |
| `logic_error`       | `docs/solutions/logic-errors/`       |
| `config_error`      | `docs/solutions/config-errors/`      |
| `dependency_issue`  | `docs/solutions/dependency-issues/`  |

## Resolution Template

Use this template for each solution document:

````markdown
---
module: "{module}"
date: "{YYYY-MM-DD}"
problem_type: "{enum}"
component: "{enum}"
symptoms:
  - "{symptom 1}"
  - "{symptom 2}"
root_cause: "{enum}"
resolution_type: "{enum}"
severity: "{critical|high|medium|low}"
tags: [tag1, tag2]
---

# Troubleshooting: {Clear Problem Title}

## Problem

{1-2 sentence description of the issue}

## Environment

- Package: {e.g., packages/core, packages/cli}
- Node Version: {e.g., 22.x}
- Affected Component: {e.g., scaffold engine, CLI parser}

## Symptoms

- {Observable symptom 1}
- {Observable symptom 2}

## What Didn't Work

**Attempted Solution 1:** {What was tried}

- **Why it failed:** {Technical reason}

**Attempted Solution 2:** {Next attempt}

- **Why it failed:** {Technical reason}

## Solution

{The actual fix — provide specific details}

**Code changes:**

```typescript
// Before (broken):
{problematic code}

// After (fixed):
{corrected code with explanation}
```
````

## Why This Works

1. **Root cause:** {What was actually broken}
2. **Why the fix works:** {Technical explanation}
3. **Underlying issue:** {Configuration, API misuse, etc.}

## Prevention

- {Coding practice to follow}
- {What to watch out for}
- {How to catch this early}

## Related Issues

- See also: {link to related doc if any}

````

## Filename Convention

Format: `{symptom-slug}-{module}-{YYYYMMDD}.md`

**Sanitization rules:**
- Lowercase
- Replace spaces with hyphens
- Remove special characters except hyphens
- Truncate to < 80 characters

**Examples:**
- `missing-zod-validation-auth-20260306.md`
- `drizzle-migration-drift-core-20260306.md`
- `hono-middleware-order-api-20260306.md`

## Critical Pattern Promotion

When a problem recurs 3+ times or has critical severity, promote it to a critical pattern:

**File:** `docs/solutions/patterns/critical-patterns.md`

**Template:**

```markdown
## N. {Pattern Name} (ALWAYS REQUIRED)

### ❌ WRONG ({Will cause X error})
```typescript
{code showing wrong approach}
````

### ✅ CORRECT

```typescript
{code showing correct approach}
```

**Why:** {Technical explanation}
**When this applies:** {Context}
**Full doc:** `docs/solutions/{category}/{filename}.md`

```

## Validation Rules

Before writing documentation, validate:

1. All required YAML fields are present
2. Enum values match allowed values exactly
3. `symptoms` is an array with 1-5 items
4. `date` matches YYYY-MM-DD format
5. Code examples are included in the solution section
6. Prevention guidance is provided

## Success Criteria

- ✅ YAML frontmatter validated
- ✅ File created in correct `docs/solutions/{category}/` directory
- ✅ Code examples included (before/after)
- ✅ Prevention guidance included
- ✅ Cross-references added if related issues found
```
