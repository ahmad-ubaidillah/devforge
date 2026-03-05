# Context Synchronization Protocol

This rule ensures that the AI always maintains perfectly synchronized state across our three core pillars of orchestration whenever the task tracker is updated or referenced.

## The Triad of Truth

Whenever you read, update, or refer to `@[tasks/task.md]`, you **MUST IMMEDIATELY** verify and synchronize the following two files:

1. **`@[.agents/memory/core-memory.md]`** (The Big Picture)
2. **`@[MasterAgent.md]`** (The Orchestration Directives)

## Synchronization Triggers

If you complete a task, start a new sprint, or are explicitly asked about the current task status (e.g., "what should we do next based on `@tasks/task.md`"):

1. **Check Core Memory:** Does `core-memory.md` reflect the newly completed tasks? Is the "Current Phase Status" up to date with the Sprint in `task.md`? If not, update it.
2. **Check MasterAgent:** Does the `MasterAgent.md` need any new operational directives based on the new type of work we are doing?
3. **Report the Triad Status:** When you reply to the user, briefly acknowledge that you have verified the alignment of the Task Tracker, Core Memory, and MasterAgent directives.

## Why this is required

Consistent adherence to this rule prevents "context drift" where the task runner gets ahead of the project's architectural memory, leading to hallucinations or incorrect dependencies in future sprints.
