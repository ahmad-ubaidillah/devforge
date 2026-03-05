# Master Sprint & Task Tracker

## Sprint Rules & Template

**Run by Scrum Master (SM).**
All tasks must follow this format to ensure strict sequential execution and QA gates.

### Definition of Done (DoD)

1. Code follows the single, logical work unit rule.
2. Mandatory self-review for syntax and logic (QA).
3. No fragmented multitasking; one component complete and verified before moving to the next.
4. Clean code over quick patches. Refactoring applies when adding new features.
5. All environment variables and secrets must be safe (`.env` placeholders).

---

## Current Sprint Tasks

### Sprint 1: Codebase Hardening & Bug Fixes

#### [Task 1] Fix Plugin Installer Variable Replacement Bug

- **User Story:** As a developer, I want my installed plugins to have their template variables replaced automatically so the integration works out-of-the-box.
- **Assigned Role(s):** BE, QA
- **Start Date:** 2026-03-05
- **Deadline:** 2026-03-05
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Install a plugin like `payments` and verify `{{SUCCESS_URL}}` or `{{PROJECT_NAME}}` tokens are replaced in the output directory.
- **Notes:** Refactor `packages/core/src/plugins/plugin-installer.ts` to implement regex replacement before or after copySync. Also update `scaffolder.ts` and tests to pass `projectName` downwards.

#### [Task 2] Refactor JSON Parsing for Graceful Fallbacks

- **User Story:** As a user, I want the CLI to handle corrupted `package.json` gracefully instead of crashing with an unhandled exception.
- **Assigned Role(s):** BE, QA
- **Start Date:** 2026-03-05
- **Deadline:** 2026-03-05
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Add a syntax error to a `package.json` file and verify `devforge-cli doctor` and scaffolding return a clean error string.
- **Notes:** Refactor `doctor.ts`, `plugin-installer.ts`, `scaffolder.ts` to use try/catch blocks. Done in `doctor.ts` and `plugin-installer.ts`.

#### [Task 3] Enhance Authentication Service Stub

- **User Story:** As a developer, I want a robust auth service skeleton using Better-Auth/Lucia instead of hardcoded mock data.
- **Assigned Role(s):** BE, UI/UX
- **Start Date:** 2026-03-05
- **Deadline:** 2026-03-05
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify the `auth.service.ts` generated from `plugins/auth` includes integration stubs for an external library.
- **Notes:** Replace `{id: 1}` with standard auth integration code. Implemented Better-Auth integration.

---

### Sprint 2: Platform Polish & Deployment

#### [Task 4] Enhance Deployment Plugin (Docker & Vercel)

- **User Story:** As a developer, I want my project to be ready for production with high-quality Dockerfiles and Vercel configuration.
- **Assigned Role(s):** DevOps, BE
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify `docker-compose.yml` and `vercel.json` are present and correctly configured for the chosen stack (e.g., SQLite for local, PG for production).
- **Notes:** Add `vercel.json`, `docker-compose.yml`, and improve `Dockerfile` with multi-stage builds. Done.

#### [Task 5] Refine Architecture Graph Generator

- **User Story:** As an architect, I want to see how my templates and plugins are interconnected so I can better understand the project structure.
- **Assigned Role(s):** BE, FE
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Run `devforge-cli graph` and verify the exported JSON/Mermaid string correctly reflects plugin-to-template compatibility.
- **Notes:** Update `graph-generator.ts` to read `template.config.json` for `supportedPlugins`. Added compatibility labels and better grouping.

#### [Task 6] Platform Polish: Enhanced Diagnostics

- **User Story:** As a developer, I want the `doctor` command to be more helpful with configuration issues.
- **Assigned Role(s):** BE, QA
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Run `doctor` with mismatched `.env` and `.env.example` and verify it identifies missing keys.
- **Notes:** Implemented `.env` key consistency check in `doctor.ts`.

---

### Sprint 3: Growth & Advanced Features

#### [Task 7] Implement Unified Search Abstraction

- **User Story:** As a developer, I want a single Search API that can switch between Postgres pg_trgm and MeiliSearch easily.
- **Assigned Role(s):** BE
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify `search.service.ts` supports a fallback to SQL-based search when MeiliSearch is not configured.
- **Notes:** Refactored to driver-base architecture.
  - **Interface**: Define `SearchDriver` with `search()`, `addDocuments()`, `deleteDocuments()`.
  - **Drivers**: `MeiliSearchDriver`, `PostgresDriver` (Drizzle/ilike).
  - **Service**: Factory to instantiate driver based on `MEILI_URL`.

#### [Task 8] Implement Analytics Plugin (Growth Hacker)

- **User Story:** As a business owner, I want to track user events out-of-the-box.
- **Assigned Role(s):** BE, DevOps
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify the presence of an `analytics` plugin with Segment or PostHog integration stubs.
- **Notes:** Created `packages/plugins/analytics`.

---

### Sprint 4: Enterprise Ready & Content (Completed)

#### [Task 9] Multi-Tenancy Support (Org/Team Logic)

- **User Story:** As an enterprise user, I want to manage multiple teams/organizations within a single account.
- **Assigned Role(s):** BE, DBA
- **Start Date:** 2026-03-07
- **Deadline:** 2026-03-07
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify `auth.service.ts` and database schemas support `orgId` filtering.
- **Notes:** Integrate Better Auth Organizations plugin. Use subpath routing and Postgres RLS.
  - **DB Schema**: `organization`, `member`, `invitation` tables.
  - **RLS**: Drizzle utility for `app.current_organization_id`.
  - **Routing**: Hono middleware for `:tenant` validation.

#### [Task 10] Headless CMS Plugin

- **User Story:** As a content creator, I want to manage blog posts and pages via a simple API.
- **Assigned Role(s):** BE, UI/UX
- **Start Date:** 2026-03-07
- **Deadline:** 2026-03-07
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify `packages/plugins/cms` provides routes for `/posts` and `/pages`.
- **Notes:** Implement basic CRUD for content. Done.
  - **Schema**: `posts` and `pages` with `organization_id`.
  - **API**: Tenant-isolated GET/POST routes.

#### [Task 11] CMS Media & Taxonomy Integration

- **User Story:** As a content creator, I want to attach images to my posts and organize them with categories and tags.
- **Assigned Role(s):** BE, DBA
- **Start Date:** 2026-03-07
- **Deadline:** 2026-03-07
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify images from `file_upload` plugin are correctly linked to CMS posts.
- **Notes:** Add `categories`, `tags`, and `assets` relationship to CMS schema.
  - **Taxonomy**: M2M via `post_tags`.
  - **Media**: `featured_image_id` (cross-plugin).
  - **Filtering**: `?category=slug` support.

#### [Task 12] CMS SEO & Rich Text Support

- **User Story:** As a marketer, I want to add SEO titles and descriptions to my pages and use a rich text editor for content.
- **Assigned Role(s):** BE, UI/UX
- **Start Date:** 2026-03-07
- **Deadline:** 2026-03-07
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify `/posts` response includes an `seo` object.
- **Notes:** Add `seo` JSON column and support for structured `content` field.
  - **SEO Metadata**: `seo_title`, `seo_description`, `og_image` (JSONB).
  - **Structured Content**: Support for Tiptap/Editor.js JSON format.

---

### Sprint 5: Marketplace & Performance (Completed)

#### [Task 13] Marketplace Discovery API

- **User Story:** As a developer, I want to see which plugins are available and compatible with my template through a simple API.
- **Assigned Role(s):** BE, PM
- **Start Date:** 2026-03-08
- **Deadline:** 2026-03-08
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify `GET /api/marketplace/plugins` returns a list with templates compatibility.
- **Notes:** Create `MarketplaceService` in `packages/core`. Aggregates `plugin.config.json` files.

#### [Task 14] Marketplace UI (Dashboard)

- **User Story:** As a user, I want a beautiful visual interface to browse and install plugins.
- **Assigned Role(s):** FE, UI/UX
- **Start Date:** 2026-03-08
- **Deadline:** 2026-03-08
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify the Marketplace page renders with "Install" buttons and status indicators.
- **Notes:** Use SolidJS/Astro for a high-end editorial aesthetic.

#### [Task 15] Performance Benchmarking & Optimization

- **User Story:** As a platform owner, I want project scaffolding to be as fast as possible.
- **Assigned Role(s):** DevOps, BE
- **Start Date:** 2026-03-08
- **Deadline:** 2026-03-08
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Run `bun run bench` and verify scaffolding for the SaaS template takes <500ms.
- **Notes:** Implement benchmarking script. Optimize `plugin-installer` I/O.

---

### Sprint 6: Advanced Ecosystem & Global Scale (Completed)

#### [Task 16] The Forge SDK: Plugin Hooks & Events

- **User Story:** As a plugin developer, I want my plugin to react to events triggered by other plugins (e.g., send an email when a user signs up).
- **Assigned Role(s):** BE, System Architect
- **Start Date:** 2026-03-09
- **Deadline:** 2026-03-09
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify that the `email` plugin can listen to a `user.created` event from the `auth` plugin.
- **Notes:** Implement a central `EventBus` in `packages/core`. Define a standard hook registry.

#### [Task 17] Core i18n Translation Service

- **User Story:** As a global business, I want my dashboard and generated apps to support multiple languages from the start.
- **Assigned Role(s):** BE, i18n Specialist
- **Start Date:** 2026-03-09
- **Deadline:** 2026-03-09
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify that `i18nService` can correctly load and switch between English and Spanish localizations.
- **Notes:** Implement a JSON-based translation manager in `packages/core`. Integrate with the GUI.

#### [Task 18] Self-Healing CLI Diagnostics

- **User Story:** As a developer, I want the `doctor` command to not just tell me something is wrong, but to offer to fix it for me.
- **Assigned Role(s):** BE, QA, DevOps
- **Start Date:** 2026-03-09
- **Deadline:** 2026-03-09
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Run `devforge doctor --fix` with a missing `.env` key and verify it auto-populates from `.env.example`.
- **Notes:** Enhance `doctor.ts` with fix modules. Support dependency repair.

---

### Sprint 7: Scalability & Developer Experience (Completed)

#### [Task 19] Background Jobs / Task Queue Plugin

- **User Story:** As a developer, I want to queue long-running tasks in the background so my API remains fast and responsive.
- **Assigned Role(s):** BE, DevOps
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify a queue plugin exists and can process a sample background task via the EventBus.
- **Notes:** Scaffold a Redis-backed queue (e.g., BullMQ) that integrates directly with the EventBus.

#### [Task 20] Real-time WebSockets / Notification Plugin

- **User Story:** As a user, I want to receive live, real-time push notifications when an event occurs in my organization without refreshing the page.
- **Assigned Role(s):** BE, FE
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** Blocked by Task 19
- **QA Smoke Test:** Verify WebSocket Server can broadcast messages triggering from the EventBus to connected clients.
- **Notes:** Integrate WebSocket support into Hono, wire up with the EventBus.

#### [Task 21] Auto-Generated OpenAPI / Swagger Documentation

- **User Story:** As a frontend developer or API consumer, I want an auto-generated Swagger UI to test and understand all backend endpoints.
- **Assigned Role(s):** BE, Technical Writer
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** Blocked by Task 20
- **QA Smoke Test:** Verify `/docs` route returns a valid Swagger UI displaying API routes.
- **Notes:** Integrate `@hono/zod-openapi` to automatically document dynamic endpoints.

#### [Task 22] Full Subscription Billing Loop

- **User Story:** As a SaaS founder, I want my scaffolded application to handle pricing tiers, Stripe webhooks, and customer portal links natively.
- **Assigned Role(s):** BE
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** Blocked by Task 21
- **QA Smoke Test:** Verify multi-tenant billing endpoints are added to the payments plugin for dealing with sub-organizations.
- **Notes:** Connect payments plugin smoothly with multi-tenancy.

---

### Sprint 8: Master Management & Automation (Active)

#### [Task 23] Admin Super-Panel (God Mode Dashboard)

- **User Story:** As a platform owner, I want a centralized dashboard to manage tenants, view plugin registries, and monitor global system metrics across the SAAS environment.
- **Assigned Role(s):** FE, BE
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify the React/Solid UI renders an "Admin" panel with a clean overview of tenant organizations.
- **Notes:** Leverage the new API routes and WebSockets for real-time monitoring of tenant activity metrics.

#### [Task 24] CLI Plugin Generator

- **User Story:** As an ecosystem developer, I want to type `devforge-cli create-plugin` to instantly scaffold a working DevForge plugin directory without memorizing the `file/src/module` boilerplate structure.
- **Assigned Role(s):** BE, DevOps
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Run the `devforge-cli create-plugin --name test-plugin` command and verify the generated folder has valid `plugin.config.json` and `files` tree.
- **Notes:** Expand `scaffolder.ts` or add a new parser directly in `packages/cli/src/commands/`.

#### [Task 25] Automated QA & Shift-Left CI Pipeline Generator

- **User Story:** As an enterprise team, I want my scaffolded applications to include an out-of-the-box GitHub Action / CI workflow that strictly enforces the defined "Shift Left Testing" and QA Phase gates.
- **Assigned Role(s):** DevOps, QA
- **Start Date:** 2026-03-06
- **Deadline:** 2026-03-06
- **Status:** Done
- **Issue/Blocker:** None
- **QA Smoke Test:** Verify scaffolding a SAAS project drops a `.github/workflows/ci.yml` file matching the project stack.
- **Notes:** Create a simple Github Actions workflow template and inject it securely in the CLI generation phase.
