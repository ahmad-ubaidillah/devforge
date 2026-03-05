---
description: Ensure AI Token Efficiency
---

# Token Efficiency Workflow

When executing any task that might involve large files or generate heavy outputs, follow these constraints:

1. **Assess Context Budget**: Before asking the user for approval or beginning a code generation step, verbally estimate if you need to read an entire file, an outline, or specific lines. Opt for the smallest footprint.
2. **Compress Output Formats**: For brainstorming or code reviews, use bullet points without introductory or concluding conversational filler.
3. **Multi-Replace Preference**: When modifying code for an existing feature, output `multi_replace_file_content` block chunks (diff replacements) rather than replacing full file contents unless the file is very small (< 40 lines).
4. **Action Over Discovery**: Limit your search and reading phases to a maximum of 3 turns before proposing a concrete action or solution.
5. **Reference vs. Regeneration**: If documenting a pattern already present in another file, do not rewrite the code block. Reference it (e.g., `See @[tests/unit/core/doctor.test.ts] L45-60`).
