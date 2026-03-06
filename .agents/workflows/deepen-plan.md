---
description: [DP] Deepen Plan — Enhance plans with parallel research for each section
---

# Deepen Plan Workflow

Take an existing plan document and enrich each section with targeted research. This workflow runs multiple research passes **in parallel** to add depth, best practices, and real-world examples to a plan.

## Input

A plan file path (e.g., `docs/plans/YYYY-MM-DD-feat-{name}-plan.md` or `tasks/prd-{feature}.md`).

## Execution

### Step 1: Parse Plan Sections

Read the plan document and identify all major sections that could benefit from deeper research.

### Step 2: Parallel Research

For each section, run the appropriate research skill:

| Plan Section                   | Research Approach                                                   |
| ------------------------------ | ------------------------------------------------------------------- |
| **Technical Approach**         | Use `skills/research-codebase/SKILL.md` to find existing patterns   |
| **Performance Considerations** | Use `skills/review-performance/SKILL.md` to identify bottlenecks    |
| **Security Requirements**      | Review against `rules/security.md` and known vulnerability patterns |
| **Architecture Decisions**     | Use `skills/review-architecture/SKILL.md` for compliance check      |
| **Database Changes**           | Check existing schemas in `packages/core/src/db/` for conventions   |
| **API Design**                 | Find similar endpoints for convention consistency                   |
| **UI/UX Requirements**         | Reference `rules/ui-ux-design.md` and existing component patterns   |

### Step 3: Enrich the Plan

For each section, add:

- **Best practices** from framework documentation
- **Reference implementations** from existing codebase (file paths + line numbers)
- **Edge cases** and failure scenarios
- **Performance implications** with estimates
- **Integration test scenarios** that unit tests won't catch

### Step 4: Add System-Wide Impact Analysis

Append a new section to the plan:

```markdown
## System-Wide Impact Analysis

### Interaction Graph

{What callbacks, middleware, or event handlers fire when this code runs?}

### Error Propagation

{How do errors flow across layers? Do retry strategies align?}

### State Lifecycle Risks

{Can partial failure leave orphaned/inconsistent state?}

### API Surface Parity

{What other interfaces expose similar functionality?}

### Integration Test Scenarios

1. {Cross-layer scenario 1}
2. {Cross-layer scenario 2}
3. {Cross-layer scenario 3}
```

### Step 5: Update Plan

Write the enriched content back to the plan file. Add a note:

```markdown
> **Deepened on {YYYY-MM-DD}** — Research added for: {list of enriched sections}
```

## Output

Announce completion and suggest next steps:

1. **Review enriched plan** — Read through the additions
2. **Start execution** → `workflows/execute-plan.md`
3. **Run code review** → `workflows/code-review.md`
