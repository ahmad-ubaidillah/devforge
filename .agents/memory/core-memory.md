---
project: DevForge
last_updated: 2026-03-08
---

# DevForge Core Memory

_This file is maintained exclusively by the MasterAgent. It serves as the persistent brain for the current project context, ensuring no details are lost across conversation sessions._

## The Big Picture (Vision)

DevForge is a modular platform for rapid application scaffolding. We are currently in **Phase 6: Advanced Ecosystem**, focusing on high-performance scaffolding, inter-plugin events, and global i18n support.

## Current Phase Status

- **Phase 1: Stabilization**: Completed. Fixed bugs in `AuthService` and `PromptsRoutes`.
- **Phase 2: Unified Search Abstraction**: Completed. Implemented driver-based search with Postgres fallback.
- **Phase 3: Analytics Integration**: Completed. Created PostHog-ready plugin.
- **Phase 4: Enterprise & Content**: Completed. Implemented Multi-tenancy (Subpath + RLS) and Headless CMS.
- **Phase 5: Marketplace & Performance**: Completed. Built discovery service, visual dashboard, and optimized scaffolding I/O.
- **Phase 6: Advanced Ecosystem**: Completed. Implemented Plugin SDK (Hooks), Core i18n, and Self-Healing CLI.
- **Phase 7: Scalability & DX**: Completed. Added BullMQ, WebSockets, OpenAPI docs, and multi-tenant Payments loop.
- **Phase 9: AI System Improvements**: Completed. Added BMAD-inspired token efficiency and UI/UX Pro Max agent skill/workflows.
- **Phase 10: Advanced SDLC Workflows**: Completed. Built full BMAD Planning Foundation (PRD, Context Generation, Tech Writer, Help Router, Strict Code Review).

## Specific Requirements & Architecture Decisions

- **Auth Strategy**: Strictly using Better Auth with Drizzle Adapter. Services must remain stateless and return headers for Hono integration.
- **Multi-Tenancy**: Subpath routing (`/tenantname`) with Row Level Security (RLS) at the database layer. Every tenant-owned table must include `organization_id`.
- **CMS Strategy**: Pluggable taxonomies and media linking. Support for JSON-structured content for rich text editors.

### **Architecture & Standards**

- **Pluggable Architecture:** All new features must be implemented as plugins in `packages/plugins`.
- **Centralized Testing:** All tests must reside in `@tests/` (unit, smoke, integration).
- **Self-Healing CLI:** Use `devforge-cli doctor --fix` to maintain project structure and health.
- **Coverage Target:** Aim for 80%+ statement coverage for all core engine modifications.
- **Event-Driven:** Use `EventBus` in `@devforge/core` for inter-plugin communication.

### **Current Sprint: Sprint 6 (Market-Ready Infrastructure)**

- [x] Task 16: Plugin Hooks & EventBus smoke test.
- [x] Task 17: Multi-tenant Middleware validation.
- [x] Task 18: CMSService integration tests.
- [x] Task 19: Root-level test centralization.
- [x] Task 20: 80% Engine Coverage achieved.
- [x] Task 21: Doctor command self-healing implementation.
- **Architecture Visualization**: Uses specialized `GraphGenerator` and Vis.js in the GUI.
- **Unified Search**: Driver-based abstraction with standard `SearchService`.

## Active Debates / Unresolved Questions

- **Search Drivers**: Should we support Algolia in this sprint or focus strictly on MeiliSearch and pg_trgm? Decision: Meili & PG for now.
- **Multi-Tenancy Isolation**: RLS vs Application Filtering. Decision: RLS for enterprise-grade isolation.
- **Routing**: Subpath (`/org`) vs Subdomain. Decision: Subpath for simplified local development and SSL management in early stages.

# User Context Request: Maintain Triad Synchronization
