---
description: [EP] Execute Plan — Systematic plan execution with quality gates and progress tracking
---

# Execute Plan Workflow

Take a work document (PRD, plan, or task file) and execute it systematically. The focus is on **shipping complete features** by understanding requirements quickly, following existing patterns, and maintaining quality throughout.

## Phase 1: Quick Start

### 1.1 Read & Clarify

1. Read the work document completely
2. Review any references or linked files
3. If anything is unclear or ambiguous, **ask clarifying questions now**
4. Check `core-memory.md` for relevant project context
5. Get user approval to proceed

> [!IMPORTANT]
> Better to ask questions now than build the wrong thing. Do not skip this step.

### 1.2 Setup Environment

Check current Git state:

```bash
current_branch=$(git branch --show-current)
```

- **If already on a feature branch**: Ask "Continue working on `{current_branch}`, or create a new branch?"
- **If on `main`**: Create a feature branch with meaningful name:
  ```bash
  git pull origin main
  git checkout -b feat/{feature-name}
  ```

### 1.3 Create Task Breakdown

Break the plan into actionable tasks:

- Include dependencies between tasks
- Prioritize based on what needs to be done first
- Include testing tasks for each implementation task
- Keep tasks specific and completable

## Phase 2: Execute

### 2.1 Task Execution Loop

For each task in priority order:

```
while (tasks remain):
  1. Read any referenced files from the plan
  2. Look for similar patterns in the codebase
  3. Implement following existing DevForge conventions
  4. Write tests for new functionality
  5. Run System-Wide Impact Check (see below)
  6. Run tests after changes
  7. Mark task as completed
  8. Check off the corresponding item in the plan document ([ ] → [x])
  9. Evaluate for incremental commit (see below)
```

### 2.2 System-Wide Impact Check

Before marking a task done, pause and answer:

| Question                                                                                                                 | Action                                                                      |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| **What fires when this runs?** Middleware, event handlers — trace two levels out.                                        | Read actual code for middleware in the request chain, service hooks.        |
| **Do tests exercise the real chain?** If every dependency is mocked, the test proves nothing about integration.          | Write at least one integration test with real objects.                      |
| **Can failure leave orphaned state?** If state is persisted before calling an external service, what happens on failure? | Trace the failure path. Test that failure cleans up or retry is idempotent. |
| **What other interfaces expose this?** Routes, CLI commands, plugin APIs — check for parity.                             | Grep for the method/behavior in related modules.                            |

**When to skip:** Leaf-node changes with no side effects. Pure additions (new helper function, new view). If the answer is "nothing fires," skip.

### 2.3 Incremental Commits

| Commit when...                                    | Don't commit when...                |
| ------------------------------------------------- | ----------------------------------- |
| Logical unit complete (service, component, route) | Small part of a larger unit         |
| Tests pass + meaningful progress                  | Tests failing                       |
| About to switch contexts (backend → frontend)     | Purely scaffolding with no behavior |
| About to attempt risky/uncertain changes          | Would need a "WIP" commit message   |

```bash
# 1. Verify tests pass
npx vitest run

# 2. Stage only files related to this logical unit
git add {relevant files}

# 3. Commit with conventional message
git commit -m "feat(scope): description of this unit"
```

### 2.4 Follow DevForge Conventions

- **150-line file limit** — split if exceeding
- **Separation of Concerns** — Routes → Service → Repository
- **Zod validation** at all boundaries
- **No hardcoded secrets** — use `.env` placeholders
- Match naming conventions from existing code
- Reuse existing components where possible

## Phase 3: Quality Check

### 3.1 Static Analysis

```bash
bun lint
bun run typecheck
```

### 3.2 Test Suite

```bash
npx vitest run
```

### 3.3 Review Checklist

- [ ] All tasks marked completed
- [ ] All tests pass
- [ ] Linting passes
- [ ] TypeScript checks pass
- [ ] Code follows existing DevForge patterns
- [ ] No console errors or warnings
- [ ] Plan document checkboxes all checked off

### 3.4 Optional: Multi-Reviewer Analysis

For complex, risky, or large changes, invoke review skills:

- `skills/review-simplicity/SKILL.md` — YAGNI check
- `skills/review-performance/SKILL.md` — Performance audit
- `skills/review-architecture/SKILL.md` — Architecture compliance
- `skills/review-patterns/SKILL.md` — Anti-pattern scan

## Phase 4: Ship It

### 4.1 Final Commit

```bash
git add .
git status
git diff --staged

git commit -m "feat(scope): description of what and why

Brief explanation if needed.

Co-Authored-By: AI Agent"
```

### 4.2 Update Project State

- Update plan status to `completed` (if YAML frontmatter has status field)
- Update `core-memory.md` to reflect what was completed
- Update `tasks/task.md` to check off the sprint item

### 4.3 Notify User

- Summarize what was completed
- Note any follow-up work needed
- Suggest running `workflows/compound.md` if debugging was involved

## Key Principles

1. **Start fast, execute faster** — Get clarification once, then execute
2. **The plan is your guide** — Follow referenced patterns, don't reinvent
3. **Test as you go** — Run tests after each change, not at the end
4. **Quality is built in** — Follow conventions, write tests, run linting
5. **Ship complete features** — Don't leave features 80% done
6. **Document learnings** — If debugging happened, run the compound workflow
