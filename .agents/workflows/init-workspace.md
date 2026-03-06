---
description: Initialize agent workspace by copying template files to active session files
---

# Initialize Agent Workspace

This workflow sets up the agent-managed session files from their committed templates.
Run this after cloning the repository or when starting a fresh development session.

## When to Use

- After a fresh `git clone`
- When `tasks/task.md` or `.agents/memory/core-memory.md` is missing
- When you want to reset the agent state to a clean slate

## Steps

// turbo-all

1. Check if `tasks/task.md` already exists. If it does, skip copying to avoid overwriting active work.

```bash
if [ ! -f tasks/task.md ]; then
  cp tasks/template-task.md tasks/task.md
  echo "✅ Created tasks/task.md from template."
else
  echo "⏭️  tasks/task.md already exists. Skipping."
fi
```

2. Check if `.agents/memory/core-memory.md` already exists. If it does, skip.

```bash
if [ ! -f .agents/memory/core-memory.md ]; then
  cp .agents/memory/template-core-memory.md .agents/memory/core-memory.md
  echo "✅ Created .agents/memory/core-memory.md from template."
else
  echo "⏭️  .agents/memory/core-memory.md already exists. Skipping."
fi
```

3. Run `devforge-cli doctor` to verify the workspace health.

```bash
bun run packages/cli/src/bin.ts doctor
```

## Notes

- The **template files** (`template-task.md`, `template-core-memory.md`) are committed to Git and serve as the boilerplate for new clones.
- The **active files** (`task.md`, `core-memory.md`) are `.gitignore`'d so live sprint data never gets pushed.
- If you need to reset the agent state, delete the active files and re-run this workflow.
