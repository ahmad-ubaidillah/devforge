---
description: [GPC] Generate Project Context
---

# Generate Project Context Workflow

This workflow scans the existing DevForge codebase to generate a highly compressed, AI-optimized `project-context.md` file. This acts as the "Source of Truth" for AI agents entering the codebase for the first time, preventing hallucinations and preserving specific architectural constraints.

## Phase 1: Pattern Recognition (Scan)

The Tech Writer and Architect work in tandem to evaluate the current source code:

1. **Tech Stack Scan**: Identify the `package.json` dependencies (e.g., SolidJS, Astro, Hono, Drizzle, Zod, Better Auth).
2. **Directory Structure**: Map the `packages/` monorepo boundaries, noting where core engine logic vs. plugin logic resides.
3. **Database Paradigms**: Check `schema.ts`. Identify if tables use standard IDs, timestamps, or multi-tenant RLS signatures like `organization_id`.
4. **API Paradigms**: Check `.routes.ts`. Are endpoints RESTful or RPC? Are they protected by Zod validators?

## Phase 2: Compression & Generation

Translate the findings into strict rules designed for an AI to parse instantly, minimizing token expenditure. Create a dense outline without boilerplate.

Define the following sections in the output:

- **Core Stack**: (Specific libraries and versions).
- **Strict Architecture Boundaries**: (E.g. "Services never handle HTTP response objects. Routes never execute SQL.").
- **Formatting Constraints**: (E.g. "MAX 150 Lines per file. Prettier + ESLint strict enforcement.").
- **Testing Approach**: (E.g. "Shift Left Testing. Unit tests in `tests/unit/`. Integration in `tests/integration/`.").

## Phase 3: Saving the Artifact

Save this generated summary to `.agents/memory/project-context.md`. Update the Orchestrator / `core-memory.md` to indicate that the context artifact is fresh and should be prioritized during code generation tasks.
