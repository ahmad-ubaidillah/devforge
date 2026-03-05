# Token Efficiency & Context Constraint

You operate in an environment where **AI context window and generation tokens are precious**. To avoid context bloat, slow generation speeds, and high costs, you MUST apply these principles to every single prompt, review, or code output.

## Core Rules

1. **Never read an entire file if an outline will suffice.** Use outlines to scan structure, then targeted line-range reads to analyze logic.
2. **Never regenerate content that already exists in memory.** If a PRD is stored in `core-memory.md` or a codebase pattern exists, reference its file path instead of copying and pasting the text into your response.
3. **Limit Output Format:** When writing code, NEVER replace the entire file content unless creating a new one or if the file is < 40 lines. Always output `multi_replace_file_content` chunks (i.e. find & replace blocks). Give only the precise lines to delete and replace.
4. **Action > Discovery:** Do not spend more than three (3) tool-call turns "discovering" or "researching" a ticket before offering a solution or executing a change. Break complex reasoning into chunks.
5. **Role-Play Compression:** Provide PM, BA, Design, and QA brainstorms or role-plays in dense bullet points only. Do not use conversational filler, greetings, or sign-offs.
