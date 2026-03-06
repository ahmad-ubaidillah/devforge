# @ahmadubaidillah/core ⚙️

The core engine and shared utilities for the **DevForge** ecosystem. This package contains the scaffolding logic, plugin installer, and the RTK-AI efficiency layer.

## 🚀 Features

- **Scaffolding Engine**: Programmatic API to generate projects from templates.
- **Plugin Installer**: Modular injection system for Hono, Drizzle, and more.
- **RTK-Filter**: Intelligence layer to compress code context for AI agents.
- **Token Tracker**: Metrics and analytics for LLM cost savings.
- **Doctor**: Architectural health checks and validation patterns.

## 🛠 Usage

This package is intended for internal use by `@ahmadubaidillah/cli` or for developers building custom wrappers around the DevForge engine.

### Programmatic Scaffolding

```typescript
import { scaffold } from "@ahmadubaidillah/core";

await scaffold({
  projectName: "my-app",
  templateName: "saas",
  targetDir: "./my-app",
  plugins: ["auth", "stripe"],
  withAgents: true,
  agentKey: "YOUR_KEY",
});
```

### Context Filtering

```typescript
import { RTKFilter, FilterLevel, Language } from "@ahmadubaidillah/core";

const compressed = RTKFilter.filter(
  rawCode,
  Language.TypeScript,
  FilterLevel.Aggressive,
);
```

## 🏗 Architecture

The core is divided into several key modules:

- `engine/`: Handles template loading, variable interpolation, and file composition.
- `utils/`: Includes the `TokenTracker`, `RTKFilter`, and `MigrationResolver`.
- `plugins/`: Logic for modular feature injection.
- `ui/`: Shared branding and design tokens for DevForge-generated apps.

## 🤝 Contributing

When modifying the core:

1. Ensure all logic is **language-agnostic** where possible.
2. Follow **Separation of Concerns** (keep engine logic out of utils).
3. Use **Zod** for all boundary validations.

---

**The engine behind professional-grade agentic applications.**
