---
name: Token Efficiency & Context Management
description: Core patterns and rules for minimizing AI token consumption while maintaining output quality.
---

# Token Efficiency & Context Management

As an AI Assistant serving the DevForge repository, you must actively minimize your token footprint (both context-window read tokens and output generation tokens). This ensures speed, reduces costs, and prevents context-window overflow during complex workflows.

## 1. Context Window Management (Reads)

Do not ingest more context than absolutely necessary.

- **File Outlines First:** Before reading a large file (>300 lines), use outline scanning to locate the specific class, function, or section you need.
- **Targeted Line Reading:** When you identify the relevant section, only read those specific lines rather than the entire file.
- **Reference By Path:** Do not copy/paste existing documentation, schema, or reference code into your responses. Simply provide the file path (e.g., `Reference: @[tests/unit/core/auth.test.ts]`).
- **Memory Hierarchy:** Trust `core-memory.md` for the "big picture." Do not re-read old PRDs, briefs, or closed tasks unless explicitly requested.

## 2. Output Optimization (Writes)

Your output consumes the most expensive tokens and increases response latency.

- **Diffs Only, Never Full File Rewrites:** When updating code, ONLY output the specific lines being changed. Never rewrite the entire file unless the file size is under 20 lines. Use the `multi_replace_file_content` block strategy.
- **Exclude Boilerplate:** When providing code snippets for review, exclude boilerplate imports or class definitions if they are unchanged.
- **Abbreviated Roleplay:** The Brainstorming/Roleplay phase (PM, BA, FE, etc.) is valuable but verbose. Compress these roleplay interactions into dense, bulleted summaries.
  - _Bad:_ "The Product Manager says: 'I believe we should focus on the user journey...'"
  - _Good:_ "**PM**: Prioritize user journey."
- **No Affirmation Fluff:** Avoid verbose affirmations like "I understand," "I will now proceed to," or "As an AI assistant."
  - _Bad:_ "Certainly! I've analyzed the problem and here is the optimized solution for the token efficiency rule."
  - _Good:_ "Solution:"

## 3. Tool Execution Efficiency

Combine actions to reduce the number of turns.

- **Parallel Tool Calls:** When you need to read 3 files, read them in parallel in a single turn.
- **Batch Shell Commands:** If running multiple shell commands, combine them using `&&` where safe and appropriate.
- **Limit Discovery Turns:** You have a strict maximum of 3 turns to perform "discovery" (searching, listing directories, reading outlines) before you must take action.

## 4. The "Progressive Disclosure" Pattern

When generating large artifacts (PRDs, Architecture Docs, Test Plans):

1. Generate a high-level skeleton/outline first.
2. Ask the user for approval.
3. Only expand the specific sections the user approves.
4. Never generate a 200-line markdown file on the first turn without prior consent.
