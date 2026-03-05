---
description: Scaffolding a new boilerplate template in DevForge
---

# Add Template Workflow

1. Navigate to `templates/` inside the monorepo root.
2. Create a new directory for the template.
3. Add a standard `template.config.json`. Refer to `.agents/templates/template-config.md`.
4. Add a `files/` directory and populate it with a typical base application scaffolding (e.g. `src/`, `package.json`).
5. Run `bun run smoke` to ensure the core builder successfully maps the variables (`{{PROJECT_NAME}}`).
6. Document in `README.md` block for Supported Templates.

// turbo-all
