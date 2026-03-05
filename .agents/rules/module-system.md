# Agent Module System Constraint

DevForge AI abilities are extensible. When managing, developing, or executing tasks relating to `.agents/skills`, you must follow the DevForge Module System architecture.

## 1. Skill Boundaries

- A **Skill** is a folder located at `.agents/skills/<skill-name>`.
- It MUST contain a single `SKILL.md` entry file detailing the contextual intelligence (e.g., `tailwind-standards`, `drizzle-optimization`).
- Skills should never execute code themselves; they are reference data for the agents.

## 2. Module Publishing & Packaging

When the user asks you to "create an installable skill pack," you must bundle it correctly:

1. **Root Directory**: `my-custom-skill/`
2. **Metadata**: Must include a `module.yaml` specifying `{ code, name, description, author }`.
3. **Contents**: Must contain a `skills/` folder with the `SKILL.md` files, and functionally dependent `workflows/` in markdown.

## 3. Conflict Resolution

If a downloaded skill conflicts with a core DevForge rule (e.g., a new framework asks for `require()` instead of `import`), the core rules (`.agents/rules/*`) ALWAYS override external modules. You must prioritize the safety, strict typing, and SDLT standards defined in `.agents/rules/coding-standards.md`.
