---
description: [DS] Dev Story Execution Workflow
---

# Dev Story Execution Workflow

This workflow dictates how the implementation agents (FE, BE, DB) must execute a structured user story. This enforces strict sequence and QA gating.

## Phase 1: Context & Story Ingestion

1. **Read the Story File**: Load the specific user story or task from `@[tasks/task.md]`.
2. **Review QA Plan**: Check the existing test boundaries or QA requirements already mapped out.
3. **Analyze Dependencies**: What existing files will this modify? (List them mentally).

## Phase 2: Implementation (Strict Sequence)

1. **Shift Left Testing**: Write the core unit tests for the complex business logic _first_. Do not skip.
2. **Execute Tasks IN ORDER**: Do not skip or re-order tasks from the story.
3. **No Halting**: Complete all implementation steps defined in the story before calling for review.
4. **Error Handling**: Implement the standard `DevForgeError` for any boundary exceptions.

## Phase 3: Developer Validation

1. **Lint and Typecheck**: You must run the `bun lint` and `bun run typecheck` commands before considering the code complete.
2. **Test Execution**: Ensure the test you wrote in Phase 2 passes.

## Phase 4: Ready for Review

1. Once the tests pass, output the summary of files changed.
2. Transition the task status to "Ready for QA/Review" in the `tasks/task.md` file.
3. Invoke the `Code Review` or `/qa-handoff` workflow.
