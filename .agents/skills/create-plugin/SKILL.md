---
name: Create DevForge Plugin
description: Step-by-step guide for creating a new DevForge plugin
---

# Create DevForge Plugin

DevForge relies heavily on its Plugin architecture to extend base templates with logic like Auth, Payments, or File Uploads.

### Step 1: Initialize Plugin Directory

1. Navigate to the DevForge monorepo root.
2. Run `mkdir -p packages/plugins/[PLUGIN_NAME]/files`.

### Step 2: Define Plugin Config

1. Create `plugin.config.json` inside your new plugin folder.
2. Declare `name`, `description`, `compatibleTemplates` (e.g., `["saas", "cms"]`), and inject required `packageDependencies` exactly matching JSON values.

```json
{
  "name": "metrics",
  "description": "Prometheus Integration for usage metrics",
  "compatibleTemplates": ["saas", "api"],
  "packageDependencies": {
    "prom-client": "latest"
  }
}
```

### Step 3: Populate Plugin Scaffold

1. In `packages/plugins/[PLUGIN_NAME]/files`, construct the isolated code you wish to inject.
2. Always respect the Feature Module standard constraint. For example, if you are adding telemetry routing:

```
files/src/modules/telemetry/routes/metrics.routes.ts
files/src/modules/telemetry/services/metrics.service.ts
```

### Step 4: Verify Compilation

1. Check that the CLI registers the new plugin:

```bash
bunx -b devforge-cli list
```

2. Make sure you don't break existing graph validators. Run smoke tests locally.
