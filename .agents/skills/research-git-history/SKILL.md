---
name: research-git-history
description: Analyze git history to understand code evolution, identify recurring issues, and discover ownership patterns. Use when investigating why code exists or understanding past decisions.
---

# Git History Research Skill

Code archaeology through git history to understand **why** code exists, **how** it evolved, and **who** knows it best.

## Quick Start

```bash
# Recent changes to a file or directory
git log --oneline -20 -- {path}

# Who contributed most to a module
git shortlog -sn -- {path}
```

## Research Methods

### 1. File Evolution Analysis

Understand how a file changed over time:

```bash
# Full history of a file
git log --follow --oneline -- {file_path}

# Show what changed in each commit
git log --follow -p -- {file_path}

# See all authors who touched this file
git log --follow --format="%an" -- {file_path} | sort | uniq -c | sort -rn
```

### 2. Bug Archaeology

Find when a bug was introduced:

```bash
# Binary search for the commit that introduced a bug
git bisect start
git bisect bad HEAD
git bisect good {known_good_commit}

# Search commit messages for keywords
git log --all --oneline --grep="{keyword}"

# Find when a specific line was added
git log -S "{code_string}" --oneline
```

### 3. Refactoring History

Understand past refactoring decisions:

```bash
# Large commits (likely refactors)
git log --oneline --shortstat | awk '/files changed/ { if ($1+0 > 10) print prev" "$0 } { prev=$0 }'

# Frequently modified files (hotspots)
git log --oneline --name-only | grep -v "^[a-f0-9]" | sort | uniq -c | sort -rn | head -20
```

### 4. Churn Analysis

Identify code hotspots (files that change frequently = risk):

```bash
# Most frequently changed files in last 3 months
git log --since="3 months ago" --name-only --pretty=format: | sort | uniq -c | sort -rn | head -20

# Files changed together (coupling detection)
git log --name-only --pretty=format:"---" | awk '/^---/{if(files)print files; files=""} /^[^-]/{files=files" "$0} END{print files}' | sort | uniq -c | sort -rn | head -10
```

### 5. Decision Context

Find commits that explain architectural decisions:

```bash
# Search for decision-related commit messages
git log --all --oneline --grep="refactor"
git log --all --oneline --grep="architecture"
git log --all --oneline --grep="breaking"
git log --all --oneline --grep="migrate"
```

## Output Format

```markdown
### Git History Analysis

**Module:** {path analyzed}
**Period:** {date range}
**Total Commits:** {count}

**Key Findings:**

1. {Finding about code evolution}
2. {Pattern of changes}
3. {Recurring problem if any}

**Code Hotspots (High Churn):**

- {file}: {change_count} changes — {risk_assessment}

**Key Contributors:**

- {author}: {commit_count} commits — {area_of_expertise}

**Relevant Past Decisions:**

- {commit_hash}: "{message}" — {why it matters}

**Recommendations:**

- {Insight that should inform the current task}
```
