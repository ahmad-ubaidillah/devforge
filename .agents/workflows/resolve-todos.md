---
description: [RT] Resolve TODOs — Find and fix TODO/FIXME comments in parallel
---

# Resolve TODOs Workflow

Systematically find, prioritize, and resolve all TODO, FIXME, and HACK comments in the codebase.

## Phase 1: Discovery

Scan the codebase for actionable comments:

```bash
# Find all TODO/FIXME/HACK comments
grep -rn "TODO\|FIXME\|HACK\|XXX" --include="*.ts" --include="*.tsx" \
  --exclude-dir=node_modules --exclude-dir=dist | head -50
```

## Phase 2: Classify

For each comment found, categorize:

| Type    | Description                                    | Priority             |
| ------- | ---------------------------------------------- | -------------------- |
| `FIXME` | Known bug or broken behavior                   | P1 — Fix immediately |
| `HACK`  | Workaround that should be properly implemented | P2 — Schedule fix    |
| `TODO`  | Missing feature or improvement                 | P2/P3 — Evaluate     |
| `XXX`   | Needs attention or review                      | P2 — Investigate     |

## Phase 3: Resolve

For each actionable item (starting with highest priority):

1. Read the surrounding code context (±20 lines)
2. Understand the original intent from the comment
3. Implement the proper fix
4. Remove the comment
5. Run tests to verify no regressions
6. Create an incremental commit

```bash
git add {files}
git commit -m "fix: resolve TODO — {description}"
```

## Phase 4: Report

```markdown
## TODO Resolution Summary

**Scanned:** {file_count} files
**Found:** {total_count} comments
**Resolved:** {resolved_count}
**Remaining:** {remaining_count} (with justification)

### Resolved

- ✅ `{file}:{line}` — {what was done}

### Deferred (with reason)

- ⏳ `{file}:{line}` — {why it's deferred}
```

## Guidelines

- **Batch related TODOs** — Resolve related ones together
- **Don't gold-plate** — Implement what the TODO says, not more
- **Test after each resolution** — Run `npx vitest run` after changes
- **Commit incrementally** — One commit per logical group of TODOs
