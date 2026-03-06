---
name: file-todos
description: File-based todo tracking system for managing code review findings, tasks, and work items with structured markdown files.
---

# File-Based Todo Tracking

Manage work items as individual markdown files with YAML frontmatter. Each finding from code review, each task from planning, or each bug report becomes a trackable file.

## Quick Start

Create a todo file:

```bash
mkdir -p todos
# Create: todos/{id}-{status}-{priority}-{description}.md
```

## File Naming Convention

```
{id}-{status}-{priority}-{description}.md
```

**Examples:**

- `001-pending-p1-missing-zod-validation.md`
- `002-pending-p2-optimize-search-query.md`
- `003-ready-p3-add-loading-spinner.md`
- `004-complete-p1-fix-auth-bypass.md`

## Status Values

| Status     | Description               | Action                |
| ---------- | ------------------------- | --------------------- |
| `pending`  | New finding, needs triage | Review and prioritize |
| `ready`    | Approved, ready to work   | Assign and implement  |
| `complete` | Work finished             | Verify and close      |

## Priority Values

| Priority | Label        | Criteria                                       |
| -------- | ------------ | ---------------------------------------------- |
| `p1`     | Critical     | Blocks merge, security issue, data corruption  |
| `p2`     | Important    | Performance, architecture, significant quality |
| `p3`     | Nice-to-have | Cleanup, minor enhancement, documentation      |

## Todo File Template

```markdown
---
status: pending
priority: p1
issue_id: "001"
tags: [code-review, security]
source: "code-review"
created: "YYYY-MM-DD"
---

# {Clear Title}

## Problem Statement

{What's broken or missing and why it matters}

## Findings

{Discovery details with evidence}

- **File:** `{path}:{line}`
- **Evidence:** {what was observed}
- **Impact:** {who/what is affected}

## Proposed Solutions

### Option A: {Name}

- **Approach:** {description}
- **Effort:** {Small|Medium|Large}
- **Risk:** {Low|Medium|High}

### Option B: {Name}

- **Approach:** {description}
- **Effort:** {Small|Medium|Large}
- **Risk:** {Low|Medium|High}

## Acceptance Criteria

- [ ] {Testable criterion 1}
- [ ] {Testable criterion 2}

## Work Log

| Date   | Action  | Notes     |
| ------ | ------- | --------- |
| {date} | Created | {context} |
```

## Workflow Commands

### List all pending todos

```bash
ls todos/*-pending-*.md 2>/dev/null
```

### List by priority

```bash
ls todos/*-p1-*.md 2>/dev/null  # Critical
ls todos/*-p2-*.md 2>/dev/null  # Important
ls todos/*-p3-*.md 2>/dev/null  # Nice-to-have
```

### Transition status

Rename the file to change status:

```bash
# pending → ready
mv todos/001-pending-p1-fix.md todos/001-ready-p1-fix.md

# ready → complete
mv todos/001-ready-p1-fix.md todos/001-complete-p1-fix.md
```

### Get next ID

```bash
next_id=$(ls todos/*.md 2>/dev/null | wc -l | xargs printf "%03d")
```

## Integration Points

- **Code Review** (`workflows/code-review.md`) creates todos from findings
- **Triage** (`workflows/triage.md`) prioritizes pending todos
- **Execute Plan** (`workflows/execute-plan.md`) works through ready todos
- **Compound** (`workflows/compound.md`) documents solutions from completed todos
