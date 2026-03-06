# 🛠️ DevForge CLI

> **The Elite Modular Boilerplate Ecosystem with Agentic Token Optimization.**

![Token Efficiency](https://img.shields.io/badge/LLM_Efficiency-60--90%25_Savings-blueviolet?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Bun_%7C_Hono_%7C_Drizzle-000000?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge)

DevForge is a high-performance scaffolding engine designed for modern full-stack development. By combining **Modular Plugin Architecture** with **Advanced AI Context Management**, DevForge allows you to spin up robust, production-grade applications while minimizing LLM costs and maximizing agentic efficiency.

---

## ⚡ Why DevForge?

Modern development is often slowed down by repetitive boilerplate and exploding LLM token costs. DevForge solves both.

### 🧩 1. Modular "Plugin-First" Architecture

Unlike monolithic boilerplates, DevForge is built on a **Lego-like plugin system**. Start with a lean core and inject features as you need them.

- **Auth**: Better Auth + Drizzle integrations.
- **Payments**: Stripe multi-tenant billing loops.
- **Search**: Unified Meilisearch abstraction.
- **Analytics**: Server-side PostHog event tracking.
- **Queue**: BullMQ + Redis task processing.

### 🧠 2. Agentic Optimization (The "Special Sauce")

DevForge includes a built-in **RTK-AI Intelligence Layer** that optimizes how AI agents (like Claude or Gemini) interact with your code.

- **RTK-Filter**: Automated context compression (removes comments/noise) saving up to **90%** on context window tokens.
- **Semantic Store**: Fact-based fragmented memory (mem0-style) instead of heavy monolithical history files.
- **Context Pruning**: Intelligent truncation that keeps only structural signatures for large-scale analysis.

### 🛡️ 3. Production Hardening

Every generated file follows **DevForge Elite Standards**:

- **Zod Validation**: Strict boundary parsing for all inputs.
- **Service Layer**: Decoupled business logic (Separation of Concerns).
- **Big O Efficiency**: Optimized database queries and payload sizes.
- **Zero Secrets**: Hardened `.env` architecture with no hardcoded PII.

---

## 🚀 Getting Started

DevForge is designed to be used via `npx` or `bunx` for zero-install scaffolding.

### Create a New Project

```bash
npx @ahmadubaidillah/cli create my-awesome-app
```

### Initialize Your Workspace (For Contributors)

```bash
bun install
bun run build
bun x devforge-cli doctor
```

---

## 🛠️ CLI Command Reference

The DevForge CLI is your command center for project lifecycle management.

| Command  | Usage                         | Description                                                      |
| :------- | :---------------------------- | :--------------------------------------------------------------- |
| `create` | `devforge-cli create [name]`  | Scaffold a new project from 8+ premium templates.                |
| `add`    | `devforge-cli add [plugin]`   | Inject a new feature (stripe, auth, cms) into your existing app. |
| `list`   | `devforge-cli list`           | View all available plugins and official templates.               |
| `gain`   | `devforge-cli gain --history` | **Cost Analytics**: View token savings and efficiency metrics.   |
| `doctor` | `devforge-cli doctor`         | Health check for your architecture and dependencies.             |
| `ui`     | `devforge-cli ui`             | Launch the local DevForge Design System builder.                 |

---

## 🧠 Smart Context Management

DevForge agents use `rtk-filter` to ingest your code efficiently. You can influence this behavior via our internal levels:

1.  **None**: Raw file ingestion (No savings).
2.  **Minimal**: Removes comments and normalizes whitespace (**~30-40% savings**).
3.  **Aggressive**: Prunes function/interface bodies, leaving only signatures and types (**~70-90% savings**).

_View your real-time performance with:_

```bash
devforge-cli gain
```

---

## 📦 Project Structure

```text
devforge/
├── packages/
│   ├── cli/          # Command Line Interface (Commander.js)
│   ├── core/         # Scaffolding Engine & Shared Utilities
│   └── plugins/      # Modular Features (Stripe, Auth, CMS, etc.)
├── templates/        # Full-stack Boilerplate Stacks (SaaS, AI, CRM)
└── .agents/          # Agent Roles, Skills & Workflows
```

---

## 🤝 Contributing

We follow a **Strict Modular SDLC**. Every new feature must include:

1.  **Zod Schema** for validation.
2.  **Service Layer** implementation.
3.  **Smoke Test** in `/tests/plugins.test.ts`.
4.  **Token Efficiency Audit**.

### Local Setup

1. Clone the repository.
2. `bun install`
3. Check status: `bun run packages/cli/src/bin.ts gain`

---

## 📄 License

DevForge is [MIT licensed](LICENSE).

**Build fast. Build lean. Build with DevForge.**
