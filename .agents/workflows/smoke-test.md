---
description: Full end-to-end integration test of DevForge scaffold pipeline
---

# Smoke Test Workflow

1. Navigate to root directory.
2. Execute the smoke test script:

```bash
bun run scripts/smoke-test.ts
```

3. Validates:

- `saas` template scaffolding
- File replacement (`{{PROJECT_NAME}}`)
- Plugin schema merge (`better-auth`)
- Acyclic dependencies (DFS graph algorithm test)
- Permission binder scans
- Auto migration conflict resolver
- Loop scaffold for `marketplace`, `cms`, `ai_wrapper`, `booking`, `finance`, `crm`

// turbo-all
