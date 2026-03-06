---
description: [BS] Brainstorm — Explore requirements and approaches before planning
---

# Brainstorm Workflow

Structured ideation that answers **WHAT** to build through collaborative dialogue. This precedes the PRD workflow (`workflows/create-prd.md`), which answers **HOW** to build it.

## When to Use

- Feature ideas that need exploration before committing to a plan
- Ambiguous requirements that need scoping
- Multiple possible approaches that need comparison
- New integrations or architectural decisions

## Phase 1: Assess Requirements Clarity

Evaluate whether brainstorming is needed:

**Skip to PRD if:**

- Specific acceptance criteria already provided
- Referenced existing patterns to follow
- Constrained, well-defined scope
- User says "just plan it"

**Brainstorm if:**

- Scope is unclear or open-ended
- Multiple valid approaches exist
- User needs to decide WHAT before HOW
- New domain or integration

## Phase 2: Understand the Idea

### 2.1 Lightweight Research

Quick scan of existing patterns in the codebase:

- Check `packages/` for similar implementations
- Review `docs/solutions/` for related past solutions (if they exist)
- Check `core-memory.md` for relevant project context

### 2.2 Collaborative Dialogue

Ask questions **one at a time** to refine understanding:

1. **Purpose**: What problem does this solve? Who benefits?
2. **Constraints**: Budget, timeline, tech stack requirements?
3. **Success Criteria**: How will we know this is working?
4. **Scope**: What's in vs. out for v1?
5. **Edge Cases**: What happens in unusual scenarios?

**Prefer multiple choice questions** when natural options exist. Continue until the idea is clear or user says "proceed."

## Phase 3: Explore Approaches

Propose **2-3 concrete approaches** for the user to choose from:

For each approach:

- Brief description (2-3 sentences)
- **Pros** and **Cons**
- **Effort estimate** (Small / Medium / Large)
- When it's the best fit

**Lead with your recommendation** and explain why. Apply **YAGNI** — prefer simpler solutions.

## Phase 4: Capture the Design

Write a brainstorm document to `docs/brainstorms/YYYY-MM-DD-{topic}-brainstorm.md`:

```markdown
---
title: "{Feature Title}"
date: "YYYY-MM-DD"
status: active
---

# {Feature Title} — Brainstorm

## What We're Building

{1-2 paragraphs summarizing the decided approach}

## Why This Approach

{Rationale for the chosen approach, why alternatives were rejected}

## Key Decisions

- Decision 1: {What was decided and why}
- Decision 2: {What was decided and why}

## Open Questions

- [ ] {Any unresolved question}

## Scope Boundaries

- **In scope:** {What's included in v1}
- **Out of scope:** {What's deferred to later}

## Success Criteria

- {Measurable outcome 1}
- {Measurable outcome 2}
```

## Phase 5: Handoff

Present next steps:

1. **Proceed to PRD** → Run `workflows/create-prd.md` (will auto-detect this brainstorm)
2. **Refine further** → Continue asking questions
3. **Done for now** → Return later with `/ce:plan`

## Important Guidelines

- **Stay focused on WHAT, not HOW** — implementation details belong in the PRD
- **Ask one question at a time** — don't overwhelm
- **Apply YAGNI** — prefer simpler approaches
- **Keep sections concise** — 200-300 words per section max

**NEVER CODE! Just explore and document decisions.**
