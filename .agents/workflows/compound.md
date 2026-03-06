---
description: [CK] Compound Knowledge — Document solved problems to build institutional memory
---

# Compound Knowledge Workflow

After a non-trivial problem is solved, capture the solution as searchable documentation. Each documented solution compounds DevForge's institutional knowledge—making future occurrences a 2-minute lookup instead of a 30-minute investigation.

> **Philosophy:** Each unit of engineering work should make subsequent units easier—not harder.

## Trigger Conditions

Activate this workflow when:

- A multi-step debugging session concludes successfully
- A non-obvious configuration or integration issue is resolved
- A workaround for a framework limitation is discovered
- A recurring problem pattern is identified

**Skip for:** Simple typos, obvious syntax errors, trivial one-line fixes.

## Phase 1: Context Extraction

Extract the following from the current session context:

1. **Module/Package**: Which DevForge package or module was affected (e.g., `packages/core`, `packages/cli`, `packages/plugins/search`)
2. **Symptom**: Exact error messages, observable behavior, stack traces
3. **Investigation Trail**: What was tried and why it failed — this is the most valuable part
4. **Root Cause**: Technical explanation of the actual underlying problem
5. **Solution**: The exact code/config changes that fixed it
6. **Prevention**: How to catch this earlier or avoid it entirely

> [!IMPORTANT]
> If critical context is missing (module name, exact error, or resolution steps), ask the user before proceeding. Do NOT generate vague documentation.

## Phase 2: Classify & Categorize

Determine the **problem type** to select the correct output directory:

| Problem Type        | Output Directory                     |
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

## Phase 3: Check for Existing Documentation

Search `docs/solutions/` for similar issues:

```bash
grep -r "<keyword from symptom>" docs/solutions/ 2>/dev/null
```

- **If similar doc found**: Cross-reference (link both documents together)
- **If same root cause**: Update existing doc instead of creating a new one
- **If no match**: Create new documentation

## Phase 4: Generate Documentation

Use the `compound-docs` skill to create the structured documentation file.

**Filename convention:** `{symptom-slug}-{module}-{YYYYMMDD}.md`

**Output path:** `docs/solutions/{category}/{filename}.md`

Load skill: `skills/compound-docs/SKILL.md`

## Phase 5: Post-Documentation Actions

Present options to the user:

```
✓ Solution documented

File created:
- docs/solutions/{category}/{filename}.md

What's next?
1. Continue workflow (recommended)
2. Add to Critical Patterns — Promote to docs/solutions/patterns/critical-patterns.md
3. Link related issues — Connect to similar documented problems
4. View documentation — See what was captured
5. Update core-memory.md — Record significant architectural learning
```

## The Compounding Loop

```
Build → Debug → Fix → Document → Validate → Deploy
  ↑                                              ↓
  └──────────────────────────────────────────────┘
               Knowledge compounds here
```

1. **First time** solving "missing Zod schema on boundary" → 30 min investigation
2. **Document** the solution → `docs/solutions/integration-issues/missing-zod-boundary-validation.md`
3. **Next time** similar issue → 2 min lookup
4. **Knowledge compounds** → Team gets smarter with every fix
