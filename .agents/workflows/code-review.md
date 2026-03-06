---
description: [CR] Code Review — Multi-Reviewer Analysis with Severity Classification
---

# Code Review Workflow

Before code is marked "Done" or passed to the QA agent (`workflows/qa-handoff.md`), the Developer must run this multi-faceted review pipeline. This workflow uses **parallel review skills** for deeper analysis and categorizes findings by severity.

## Phase 1: Static Analysis Gates

You MUST successfully run the following commands. If any fail, halt the review and return to the implementation step (`workflows/dev-story.md`):

1. `bun lint`
2. `bun run typecheck`

## Phase 2: Security & Architecture Audit (Shift Left)

Review the changed files against these core DevForge principles:

- **Zero Secrets**: Are there any hardcoded API keys or credentials? (If yes, reject).
- **Zod Validation**: Is the incoming HTTP payload at the boundary fully validated? (If no, reject).
- **Separation of Concerns**: Did the Developer put business logic inside the `.routes.ts` file instead of the `.service.ts` file? (If yes, reject).
- **Dependency Map**: Do any Repositories depend on other Repositories? (If yes, reject and ask for a Service layer orchestrator).

## Phase 3: Multi-Reviewer Analysis (Parallel)

Run specialized review skills **in parallel** for deeper analysis. Each reviewer focuses on a different quality dimension:

### Required Reviewers

| Reviewer Skill                      | Focus Area                           | When to Run |
| ----------------------------------- | ------------------------------------ | ----------- |
| `skills/review-simplicity/SKILL.md` | YAGNI violations, over-engineering   | Always      |
| `skills/review-patterns/SKILL.md`   | Anti-patterns, design pattern misuse | Always      |

### Conditional Reviewers

| Reviewer Skill                        | Focus Area                        | When to Run                                                 |
| ------------------------------------- | --------------------------------- | ----------------------------------------------------------- |
| `skills/review-performance/SKILL.md`  | N+1 queries, memory leaks, O(n²)  | Changes to services, repositories, or data processing       |
| `skills/review-architecture/SKILL.md` | SOLID violations, module coupling | New modules, cross-package changes, architectural decisions |

### Past Solutions Check

Search `docs/solutions/` for documented patterns related to the changed modules:

```bash
grep -r "{module_name}" docs/solutions/ 2>/dev/null
```

If past solutions are relevant, flag them as "Known Pattern" with links to the solution docs.

## Phase 4: Efficiency & Token Size Limits

- **150-Line Limit**: Do any of the modified or created files exceed 150 lines? (If yes, recommend a refactor to split the logic).
- **Big O Optimization**: Ensure there are no nested `O(n²)` loops when processing data payloads.

## Phase 5: Findings Synthesis

### Categorize by Severity

All findings from Phase 2-4 must be categorized:

| Severity | Label            | Action       | Description                                                        |
| -------- | ---------------- | ------------ | ------------------------------------------------------------------ |
| 🔴 P1    | **CRITICAL**     | Blocks merge | Security vulnerabilities, data corruption risks, breaking changes  |
| 🟡 P2    | **IMPORTANT**    | Should fix   | Performance issues, architectural concerns, major quality problems |
| 🔵 P3    | **NICE-TO-HAVE** | Enhancement  | Minor improvements, code cleanup, optimization opportunities       |

### Deduplicate & Estimate

- Remove duplicate or overlapping findings across reviewers
- Estimate effort for each finding: Small / Medium / Large
- Group by severity

### Summary Report

```markdown
## ✅ Code Review Complete

### Findings Summary

- **Total Findings:** {count}
- **🔴 CRITICAL (P1):** {count} — BLOCKS MERGE
- **🟡 IMPORTANT (P2):** {count} — Should Fix
- **🔵 NICE-TO-HAVE (P3):** {count} — Enhancements

### P1 Critical (Must Fix)

- {Finding 1}: {description} [{effort}]
- {Finding 2}: {description} [{effort}]

### P2 Important (Should Fix)

- {Finding 3}: {description} [{effort}]

### P3 Nice-to-Have

- {Finding 4}: {description} [{effort}]

### Review Skills Used

- review-simplicity ✓
- review-patterns ✓
- review-performance ✓ (if triggered)
- review-architecture ✓ (if triggered)

### Past Solutions Referenced

- {link to any relevant docs/solutions/ files}
```

## Phase 6: Approval

### If P1 findings exist → MERGE BLOCKED

Address all P1 findings before proceeding. Return to `workflows/dev-story.md` for fixes.

### If no P1 findings → APPROVED

1. Output the summary report above
2. Mark the story step as complete in `tasks/task.md`
3. Instruct the QA Agent to begin test generation (`workflows/qa-handoff.md`)
4. Suggest running `workflows/compound.md` if any debugging or non-obvious fixes occurred during the review
