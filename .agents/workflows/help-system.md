---
description: [HELP] Context-Aware Guidance Router
---

# Help Support System

If the user runs `/help`, `/bmad-help`, or asks "What should I do next?", the agile orchestrator invokes this workflow to determine the exact state of the project and route them to the correct action.

## Phase 1: Context Discovery

1. Ensure the `core-memory.md` is loaded. Determine the active Phase of development.
2. Read the `tasks/task.md` file to see if there is an active Sprint. Are there open stories?
3. Review the last 3 turns of context to see if there is an unresolved blocker or error.

## Phase 2: State Routing

Identify which state the project is currently in:

**State A: Project is Empty or Idea Phase**

- Propose: `Brainstorming Protocol` (`rules/project-lifecycle.md`) or `Market Research` (`workflows/research-market.md`).
- Output: _"It looks like we are starting fresh. Shall I summon the Expert Panel to brainstorm, or do you want to start defining the PRD (`[CP] Create PRD`)?"_

**State B: Requirements Exist, No Code Written**

- Propose: `Create Architecture` (`workflows/create-architecture.md`) or `Sprint Planning` (`workflows/sprint-planning.md`).
- Output: _"The PRD is ready. Shall the Architect draft the Database/API schemas, or should the Scrum Master sequence out the Sprint Stories?"_

**State C: Active Sprint, Stories Pending**

- Propose: `Dev Story` (`workflows/dev-story.md`).
- Output: _"We are mid-sprint. The next story is [Title]. Shall I execute the Dev Story workflow?"_

**State D: Story Completed, Waiting for Check**

- Propose: `Code Review` (`workflows/code-review.md`) or `QA Handoff` (`workflows/qa-handoff.md`).
- Output: _"The code is written. Shall we run the strict Code Review checklist or hand it off to QA to generate tests?"_

**State E: Small Fix Requested (Off-Sprint)**

- Propose: `Quick Flow` (`workflows/quick-flow.md`).
- Output: _"For this one-off request, I will execute the Quick Flow Mode, bypassing the full Agile overhead."_

## Phase 3: Deliver Options

Present the User with the exact commands/workflows they can trigger based on the State mapping, ensuring you use bold formatting for clarity.
