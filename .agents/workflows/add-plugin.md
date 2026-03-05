---
description: Adding a new pluggable feature to DevForge
---

# Add Plugin Workflow

1. Navigate to `packages/plugins/` inside the monorepo root.
2. Create a new directory for the plugin.
3. Add a standard `plugin.config.json`. Refer to `.agents/templates/plugin-config.md`.
4. Add a `files/` directory, structured exactly like the destination boilerplate (e.g. `files/src/modules/[PLUGIN_NAME]/...`).
5. Ensure the plugin specifies valid dependencies inside `packageDependencies`.
6. Add the plugin manually to existing template configurations (`template.config.json` -> `supportedPlugins`) so users can select it.
7. Run `bun run smoke` to verify file composition on scaffolding.

// turbo-all
