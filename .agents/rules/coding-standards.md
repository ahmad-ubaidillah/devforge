# DevForge Coding Standards

Welcome to the DevForge project! As an AI assistant, you MUST follow these elite industry standards when contributing to this codebase.

## 1. Universal Language Constraints

- We use **TypeScript** strictly across all logic.
- **Zod Data Validation**: Everything at the boundary must be validated. (Env vars, request payloads, plugin configs, template configs).
- Use `import` and `export` (ESM). No `require()`.

## 2. Dependency Management

- **Use Bun**: Do not use `npm` or `yarn` or `pnpm`. `bun run`, `bun install`, `bun test`.
- Prefer existing lightweight dependencies (`hono`, `zod`, `chalk`, `ora`) before adding new libraries. Keep the dependency graph small.

## 3. Formatting & Linting

- Never merge code that breaks `eslint` or `prettier`.
- Always structure code logically.
- Avoid monolithic functions.

## 4. The 150-Line Limit Rule (Mudah Maintenance)

To ensure long-term maintainability, DevForge strictly enforces file size limits.

- **MAXIMUM 150 lines of code per file.**
- If a file exceeds this limit, or is projected to, you MUST split it into smaller, logically sound files (e.g., separating interfaces, extracting helper functions to `utils/`, or breaking up complex UI components).
- **Rule of Thumb**: Having many small files and folders is perfectly acceptable and preferred, as long as the architecture remains predictable.

## 5. Error Handling

- Use the `DevForgeError` class (`packages/core/src/core/errors.ts`) for throwing expected errors.
- Always include a `code` (e.g., `'INVALID_INPUT'`) and optionally `details` logic.
- Use `handleError` for centralized logging in CLI commands.
- **Fail gracefully** with actionable messages. Don't let raw stack traces leak to the end user.

## 7. Naming Conventions

- **Files**: `kebab-case.ts` (e.g. `template-loader.ts`, `auth.routes.ts`)
- **Classes**: `PascalCase` (e.g. `TemplateComposer`)
- **Functions/Variables**: `camelCase` (e.g. `loadTemplate`)
- **Constants/Enums**: `UPPER_SNAKE_CASE` (e.g. `DEFAULT_PORT`)
- **Types/Interfaces**: `PascalCase` (e.g. `TemplateConfig`)

## 7. Self-Documenting Code

- Provide intuitive naming. Brief, clear JSDoc comments for public APIs and utilities.
- Explain "Why," not "What," in inline comments.

## 8. Performance & Async

- Always use `await` where async tasks are performed.
- Avoid blocking the main thread. Use `fs/promises` or `fs-extra` carefully depending on sync/async requirements inside CLI executions (scaffolder uses some Sync for speed, but follow the existing pattern).
- `Big O Efficiency`: Optimize array loops and data validations for speed.

## 9. Continuous Verification (Testing Gates)

- You must always test your code before marking a task or phase as complete.
- See `.agents/rules/project-lifecycle.md` for the mandatory `bun lint` and `bun run typecheck` Phase Gates.

## 10. Strict Smoke Test Boundaries

- **ABSOLUTE RULE:** It is STRICTLY FORBIDDEN to create `smoke-test` folders, artifacts, or scripts outside of the `tests/` directory.
- All smoke test output directories (e.g., `smoke-test-app`, `smoke-test-saas`) MUST be generated inside the `tests/` folder.
- Never pollute the root directory with smoke test folders.
