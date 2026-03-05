---
description: [QF] Quick Flow Mode for Small Tasks
---

# Quick Flow Mode

For isolated, simple tasks, hotfixes, or single script utilities that do not require the comprehensive multi-agent overhead of full Scrum sprints.

## Rules of Engagement

1. **Size Limit**: Can only be used for small bugs, typos, refactoring < 3 files, or self-contained utility functions.
2. **One-Shot Execution**: No "Phase Gates" or roleplay debates. The agent acts immediately on the ticket.
3. **No PRD Generation**: Skip the PM / Business Analyst requirements elicitations.

## Step 1: Implementation

Immediately apply the `multi_replace_file_content` block to make the exact requested modifications to the file in question.

## Step 2: Quality Check (QA Bypass)

Since a QA agent is bypassed in this quick flow, you must self-test.
Run `.devforge-cli doctor` or `bun lint && bun run test <spec_file>`.

## Step 3: Record Change

If the task alters any structural truth regarding an API contract or core architecture, briefly update `core-memory.md`. Otherwise, note completion and end the interaction.
