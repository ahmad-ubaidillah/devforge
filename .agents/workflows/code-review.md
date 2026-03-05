---
description: [CR] Code Review & Validation Gates
---

# Code Review Workflow

Before code is marked "Done" or passed to the QA agent (`workflows/qa-handoff.md`), the Developer must run this strict multi-faceted review checklist.

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

## Phase 3: Efficiency & Token Size Limits

- **150-Line Limit**: Do any of the modified or created files exceed 150 lines? (If yes, recommend a refactor to split the logic).
- **Big O Optimization**: Ensure there are no nested `O(n^2)` loops when processing data payloads.

## Phase 4: Approval

If the code passes Phase 1, 2, and 3, output a brief summary of the successful review. Mark the story step as complete in `tasks/task.md` and instruct the QA Agent to begin test generation.
