---
description: [BR] Bug Report — Structured bug reporting and reproduction
---

# Bug Report Workflow

Create structured, reproducible bug reports with environment details, reproduction steps, and initial investigation.

## Phase 1: Gather Information

### Required Details

1. **Title**: Clear, searchable summary of the bug
2. **Environment**:
   ```bash
   node --version
   bun --version 2>/dev/null
   cat package.json | grep '"version"'
   uname -a
   ```
3. **Steps to Reproduce**: Numbered, specific steps anyone can follow
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens (include exact error messages)
6. **Screenshots/Logs**: If applicable

## Phase 2: Investigate

### Quick Analysis

```bash
# Check recent changes to affected files
git log --oneline -10 -- {affected_files}

# Search for related issues in docs/solutions/
grep -r "{error_keyword}" docs/solutions/ 2>/dev/null

# Check if this is a known pattern
grep -r "{error_keyword}" .agents/skills/compound-docs/ 2>/dev/null
```

## Phase 3: Generate Report

Write to `docs/bugs/YYYY-MM-DD-{slug}.md`:

```markdown
---
title: "{Bug Title}"
date: "YYYY-MM-DD"
severity: "{critical|high|medium|low}"
status: open
affected_module: "{module name}"
---

# Bug: {Title}

## Summary

{1-2 sentence description}

## Environment

- Node: {version}
- OS: {os}
- Package: {affected package + version}

## Steps to Reproduce

1. {Step 1}
2. {Step 2}
3. {Step 3}

## Expected Behavior

{What should happen}

## Actual Behavior

{What actually happens}

## Error Output
```

{Exact error message, stack trace, or log output}

```

## Initial Investigation
- **Likely affected files:** {list}
- **Recent changes:** {relevant commits}
- **Related solutions:** {links to docs/solutions/ if any}

## Possible Root Causes
1. {Hypothesis 1}
2. {Hypothesis 2}
```

## Phase 4: Next Steps

1. **Fix immediately** → `workflows/execute-plan.md` with the bug report as input
2. **Triage first** → `workflows/triage.md` to prioritize
3. **Document if fixed** → `workflows/compound.md` to capture the solution
