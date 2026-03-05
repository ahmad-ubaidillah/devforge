---
name: Create DevForge Template
description: Step-by-step guide for creating a new DevForge boilerplate template
---

# Create DevForge Template

This skill details how to scaffold a new framework/stack template within the DevForge architecture.

### Step 1: Initialize Template Directory

1. Run `mkdir -p templates/[TEMPLATE_NAME]/files` from the DevForge monorepo root.
2. The `[TEMPLATE_NAME]` should match the intent (e.g. `ecommerce`, `api-only`).

### Step 2: Create Template Config

1. Create `templates/[TEMPLATE_NAME]/template.config.json`.
2. Ensure you specify `name`, `description`, `stack` (runtime, framework), and `supportedPlugins` arrays matching valid plugins in `packages/plugins`.

```json
{
  "name": "ecommerce",
  "description": "Next.js Storefront with Stripe",
  "stack": {
    "runtime": "bun",
    "frontend": "nextjs",
    "database": "postgres"
  },
  "supportedPlugins": ["auth", "payments"]
}
```

### Step 3: Populate Template Scaffold

1. Place all base structure code inside `templates/[TEMPLATE_NAME]/files`.
2. Include a `package.json` inside `/files/`.
3. Scaffold core configurations: `tsconfig.json`, `eslint.config.ts`.
4. Create the standard feature-based directory structure (`src/modules`, `src/core`, `src/routes.ts`).
5. Ensure placeholders match DevForge format (`{{PROJECT_NAME}}`).

### Step 4: Verify and Test

1. Add the new template name to `packages/cli/src/prompts.ts` or expect the CLI to naturally discover it.
2. In the DevForge root run `bun run smoke` to execute the integration testing script. Try scaffolding the new template manually to see if all tokens are successfully replaced.

```bash
bun test packages/core/test/template-loader.test.ts
```
