# DevForge CLI 🚀

> **Modular Boilerplate Ecosystem for Modern Web Apps.**

DevForge CLI is an ultra-fast, extensible scaffolding engine designed to eliminate "boilerplate fatigue". By providing production-grade, modular architectures out-of-the-box, it empowers developers, indie hackers, SaaS builders, and agencies to instantly spin up full-stack applications with optimal performance.

---

## 🌟 Vision & Problem Solved

Modern web development is often bogged down by recreating the exact same infrastructure: project structure, API layers, validation logic, database models, role permissions, and error handling. Existing tools are either overengineered and bloated, or underpowered and lacking clean architecture.

DevForge bridges this gap, giving developers an ecosystem that is **fast, lightweight, scalable, and beautifully structured**.

## 🏗️ Core Architecture & Standards

DevForge enforces elite industry standards across all its templates:

- **Feature-Based Architecture**: Unified modules containing their own routes, services, and repositories.
- **Service Layer Pattern**: Decoupled business logic for maximum reusability and testability.
- **Repository Pattern**: Strict database abstraction for clean model management.
- **Zod-Powered Typings**: End-to-end tiered validation for environment variables, API payloads, and internal state.
- **Centralized Resilience**: Global error handling with standardized semantic failure codes.
- **Performance First**: Built securely on the Bun runtime and Hono framework, ensuring sub-100ms startup times and minimal bundle sizes.

---

## 📦 Monorepo Structure

DevForge itself is built as a robust monorepo to separate concerns efficiently:

- `packages/cli`: The primary interactive CLI engine.
- `packages/core`: The overarching scaffolding engine and validators.
- `packages/plugins`: Modular feature extensions (Auth, Payments, Media, etc.).
- `templates/`: Production-ready, fully formed boilerplate stacks.

## 🛠️ Getting Started

To spin up a new DevForge application in seconds:

```bash
# Run the DevForge CLI directly
npx devforge-cli create my-app
```

You can then select your project type, frontend frameworks, backend stack, and plugin features dynamically.

---

## 🏗️ Supported Boilerplate Templates

DevForge CLI currently ships with **8 powerful application templates** designed for diverse use cases:

1. **Landing Page**: Astro + TailwindCSS + AlpineJS. Perfect for highly-optimized marketing and SaaS landing sites.
2. **SaaS Application**: Bun + Hono + Drizzle ORM + Better Auth + SolidJS. A multi-tenant SaaS platform structure with subscriptions and roles.
3. **CMS Platform**: Tiptap Editor + Media Library baked in for robust content management.
4. **Marketplace**: End-to-end multi-vendor eCommerce setup including payments and inventory.
5. **AI Wrapper**: Scaffolding designed specifically for generative AI APIs with built-in prompt management and usage tracking.
6. **Booking / Scheduling**: Calendars, availability rules, and scheduling capabilities.
7. **Finance Tool**: Core transaction tracking, budgets, and reporting dashboards.
8. **CRM System**: Contact lists, lead pipelines, and task features.

---

## 🧩 Plugin System & Extensibility

One of DevForge's biggest superpowers is its **Advanced Plugin Engine**. During app generation, or systematically afterwards, you can seamlessly add modules:

- Authentication (Better Auth, etc.)
- Payments (Stripe)
- Email Notifications
- Search Providers (Meilisearch)
- Analytics & Behavioral Tracking
- and more!

### 🔧 Key CLI Features

- **Dependency Graph Validator**: Automatically detects and prevents circular architectural dependencies before they cause bugs.
- **Auto Permission Binding**: Connect permissions implicitly to routes (`POST /products -> product.create`).
- **Migration Resolver**: Automatically merge conflicting schema migrations across branches.
- **Framework Agnostic Frontends**: Easily swap out SPA or SSR layers depending on your requirements.

---

## 🤝 Contribution Guide

We actively welcome contributions to build out this ecosystem.

1. **Clone the repo.**
2. **Install dependencies:** `bun install`
3. **Initialize workspace:** Copy agent templates to active session files:
   ```bash
   cp tasks/template-task.md tasks/task.md
   cp .agents/memory/template-core-memory.md .agents/memory/core-memory.md
   ```
   > **Note:** `task.md` and `core-memory.md` are `.gitignore`'d. They are session-specific files managed by the AI agent. Only the `template-*` versions are committed.
4. **Run tests:** `bun run test`
5. **Run health check:** `bun run packages/cli/src/bin.ts doctor`
6. Create a new branch, add your templates or core tests following the existing modular structure, and open a PR!

---

## 📄 License

DevForge is [MIT licensed](LICENSE). Build something amazing!
