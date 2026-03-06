---
description: [CL] Changelog — Auto-generate changelogs from git history
---

# Changelog Workflow

Generate engaging, human-readable changelogs from recent git commits and merged branches.

## Phase 1: Gather Changes

```bash
# Get commits since last tag or specified date
git log --oneline --since="{date}" --no-merges

# Or between two tags
git log --oneline {old_tag}..{new_tag} --no-merges

# Group by conventional commit type
git log --oneline --since="{date}" --no-merges | grep -E "^[a-f0-9]+ (feat|fix|refactor|docs|test|chore)"
```

## Phase 2: Categorize

Parse conventional commit messages into groups:

| Prefix             | Changelog Section   |
| ------------------ | ------------------- |
| `feat:`            | ✨ New Features     |
| `fix:`             | 🐛 Bug Fixes        |
| `refactor:`        | ♻️ Improvements     |
| `perf:`            | ⚡ Performance      |
| `docs:`            | 📚 Documentation    |
| `test:`            | 🧪 Testing          |
| `chore:`           | 🔧 Maintenance      |
| `BREAKING CHANGE:` | 💥 Breaking Changes |

## Phase 3: Generate

Write the changelog entry:

```markdown
# Changelog

## [{version}] — {YYYY-MM-DD}

### ✨ New Features

- **{scope}:** {human-readable description} ({commit_hash})

### 🐛 Bug Fixes

- **{scope}:** {human-readable description} ({commit_hash})

### ♻️ Improvements

- **{scope}:** {human-readable description} ({commit_hash})

### 💥 Breaking Changes

- **{scope}:** {description} — migration: {instructions}
```

## Phase 4: Output

Options:

1. **Append to CHANGELOG.md** — Add entry to the top of the changelog file
2. **Display only** — Show the generated changelog for review
3. **Create GitHub Release** — Use `gh release create` with the changelog body

## Guidelines

- **Write for humans** — Translate commit messages into user-facing language
- **Highlight breaking changes** — Always include migration instructions
- **Group related changes** — Combine related commits into single entries
- **Link to PRs/issues** — Include references where available
