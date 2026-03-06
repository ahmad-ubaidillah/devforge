---
name: git-worktree
description: Manage Git worktrees for parallel development. Use when working on multiple features simultaneously or when you need an isolated environment for experimentation.
---

# Git Worktree Skill

Use Git worktrees to work on multiple branches simultaneously without stashing or switching contexts.

## Quick Start

```bash
# Create a worktree for a new feature branch
git worktree add ../devforge-feat-auth -b feat/auth

# Create a worktree from an existing branch
git worktree add ../devforge-fix-search fix/search-indexing

# List all worktrees
git worktree list
```

## When to Use

| Scenario                                            | Worktree? | Why                             |
| --------------------------------------------------- | --------- | ------------------------------- |
| Working on feature A, urgent bug fix needed         | ✅ Yes    | Don't lose context on feature A |
| Running tests on one branch while coding on another | ✅ Yes    | Parallel workflows              |
| Comparing implementations side by side              | ✅ Yes    | Both checkouts accessible       |
| Quick one-file fix on main                          | ❌ No     | Just stash and switch           |
| Linear, sequential work on one feature              | ❌ No     | Overhead not worth it           |

## Worktree Conventions

### Naming

Place worktrees alongside the main repo with a suffix:

```
~/Documents/New Project/
├── DevForge/                    # Main worktree (main branch)
├── DevForge-feat-auth/          # Feature worktree
├── DevForge-fix-search/         # Bugfix worktree
└── DevForge-experiment-grpc/    # Experimental worktree
```

### Creating a Worktree

```bash
# From inside the main repo:

# 1. Create worktree with new branch from main
git worktree add ../DevForge-feat-{name} -b feat/{name}

# 2. Navigate to worktree
cd ../DevForge-feat-{name}

# 3. Install dependencies (shared node_modules won't work across worktrees)
bun install
```

### Managing Worktrees

```bash
# List all active worktrees
git worktree list

# Remove a worktree (after merging/discarding branch)
git worktree remove ../DevForge-feat-{name}

# Prune stale worktree references
git worktree prune
```

### Merging Back

```bash
# From main worktree:
cd ~/Documents/New\ Project/DevForge

# Merge the feature branch
git merge feat/{name}

# Clean up the worktree
git worktree remove ../DevForge-feat-{name}

# Delete the branch if merged
git branch -d feat/{name}
```

## Important Notes

- Each worktree has its own working directory and index
- They **share** the same `.git` repository (commits, refs, objects)
- You **cannot** check out the same branch in two worktrees
- Run `bun install` in each worktree (dependencies are not shared)
- Worktrees are lightweight — they add minimal disk space

## Cleanup Checklist

Before removing a worktree:

- [ ] Changes committed or stashed
- [ ] Branch merged to main (if keeping changes)
- [ ] No running dev servers in the worktree
- [ ] `git worktree remove` (not `rm -rf`)
