---
project: DevForge
last_updated: YYYY-MM-DD
---

# DevForge Core Memory

_This file is maintained exclusively by the MasterAgent. It serves as the persistent brain for the current project context, ensuring no details are lost across conversation sessions._

## The Big Picture (Vision)

DevForge is a modular platform for rapid application scaffolding. We are currently in **Phase 1: Getting Started**.

## Current Phase Status

_Update this section as phases are completed. Each phase corresponds to a Sprint in `tasks/task.md`._

- **Phase 1: Getting Started**: In Progress. Initial environment setup and onboarding.

## Specific Requirements & Architecture Decisions

- **Auth Strategy**: Strictly using Better Auth with Drizzle Adapter. Services must remain stateless and return headers for Hono integration.
- **Multi-Tenancy**: Subpath routing (`/tenantname`) with Row Level Security (RLS) at the database layer. Every tenant-owned table must include `organization_id`.
- **CMS Strategy**: Pluggable taxonomies and media linking. Support for JSON-structured content for rich text editors.

### **Architecture & Standards**

- **Pluggable Architecture:** All new features must be implemented as plugins in `packages/plugins`.
- **Centralized Testing:** All tests must reside in `tests/` (unit, smoke, integration).
- **Self-Healing CLI:** Use `devforge-cli doctor --fix` to maintain project structure and health.
- **Coverage Target:** Aim for 80%+ statement coverage for all core engine modifications.
- **Event-Driven:** Use `EventBus` in `@devforge/core` for inter-plugin communication.

### **Current Sprint: Sprint 1 (Getting Started)**

- [ ] Task 1: Environment Setup & Onboarding.

## Active Debates / Unresolved Questions

_Record any architectural trade-offs or open questions here._

# User Context Request: Maintain Triad Synchronization
