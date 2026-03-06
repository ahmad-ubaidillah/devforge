---
description: [TR] Triage — Prioritize and categorize issues, findings, and work items
---

# Triage Workflow

Systematically prioritize and categorize a batch of issues, review findings, or feature requests.

## When to Use

- After a code review generates multiple findings
- When processing a batch of bug reports
- During sprint planning to prioritize backlog items
- When `docs/solutions/` reveals recurring patterns

## Phase 1: Gather Items

Collect all items to triage from:

```bash
# Review findings (if from code review)
ls todos/*-pending-*.md 2>/dev/null

# Solution docs (if analyzing patterns)
find docs/solutions/ -name "*.md" -newer {reference_date}

# Task items
grep -n "- \[ \]" tasks/task.md
```

## Phase 2: Classify Each Item

For each item, determine:

### Severity

| Level | Label            | Criteria                                                        |
| ----- | ---------------- | --------------------------------------------------------------- |
| 🔴 P1 | **Critical**     | Blocks deployment, security vulnerability, data corruption risk |
| 🟡 P2 | **Important**    | Performance degradation, architectural debt, user-facing bug    |
| 🔵 P3 | **Nice-to-have** | Code cleanup, minor improvement, documentation update           |

### Effort

| Size       | Hours | Description                                  |
| ---------- | ----- | -------------------------------------------- |
| **Small**  | < 2h  | Single file change, straightforward fix      |
| **Medium** | 2-8h  | Multiple files, some complexity, needs tests |
| **Large**  | > 8h  | Cross-package change, significant refactor   |

### Impact

| Level      | Description                                               |
| ---------- | --------------------------------------------------------- |
| **High**   | Affects many users, core functionality, or data integrity |
| **Medium** | Affects some users or non-critical functionality          |
| **Low**    | Affects edge cases or developer experience only           |

## Phase 3: Prioritize

Create a prioritized list using the **Impact/Effort Matrix**:

```
        High Impact
            │
   DO FIRST │ SCHEDULE
   (P1, Sm) │ (P1, Lg)
────────────┼────────────
   DELEGATE │ BACKLOG
   (P3, Sm) │ (P3, Lg)
            │
        Low Impact
    Low Effort ──── High Effort
```

**Priority Order:**

1. 🔴 P1 + Small effort → Do immediately
2. 🔴 P1 + Medium effort → Schedule for this sprint
3. 🟡 P2 + Small effort → Quick wins, do next
4. 🟡 P2 + Medium/Large effort → Schedule for next sprint
5. 🔵 P3 → Backlog

## Phase 4: Output

Generate a triage summary:

```markdown
## Triage Summary — {date}

### Do Now (P1 + Small)

- [ ] {item}: {description} [~{effort}]

### This Sprint (P1 + Medium/Large)

- [ ] {item}: {description} [~{effort}]

### Quick Wins (P2 + Small)

- [ ] {item}: {description} [~{effort}]

### Next Sprint (P2 + Medium/Large)

- [ ] {item}: {description} [~{effort}]

### Backlog (P3)

- [ ] {item}: {description} [~{effort}]

### Stats

- Total items triaged: {count}
- Critical (P1): {count}
- Important (P2): {count}
- Nice-to-have (P3): {count}
- Estimated total effort: {hours}h
```

Update `tasks/task.md` with the prioritized items.
