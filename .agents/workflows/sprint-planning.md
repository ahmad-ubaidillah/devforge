---
description: [SP] Sprint Planning Automation Facilitation
---

# Sprint Planning Workflow

The Scrum Master runs this sequence to ensure the development team is aligned on upcoming Epics and User Stories.

## Phase 1: Capacity & Context

1. **Review Core Memory**: Understand the Phase we are in (from `core-memory.md`). What is the broad goal?
2. **Review Open Tasks**: What is currently parked or actively in `tasks/task.md`?

## Phase 2: Story Generation

Translate the PRD or Brief into individual DevForge-friendly tasks.
Each story must follow the format:

- **Title**: (e.g., Build Auth Middleware)
- **Role**: FE / BE / DBA
- **Acceptance Criteria**: 3-4 bullet points defining done.
- **Test Strategy**: QA's automated or manual plan requirements.

## Phase 3: Sequencing

Define dependencies. Task B cannot start until Task A is done. Re-order the Sprint to match this causal chain (e.g., Schema -> API -> Frontend).
Store this final sequence in `tasks/task.md` under the newly labeled Sprint phase.
