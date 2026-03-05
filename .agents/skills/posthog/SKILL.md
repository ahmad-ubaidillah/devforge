---
name: PostHog Analytics
description: Server-side event tracking and user behavior analytics.
---

# PostHog Analytics Best Practices

DevForge integrates `posthog-node` to map User and Organization metrics dynamically.

## 1. Server-Side Focus

- For accurate tracking, fire key business metrics (e.g., `'Project Created'`, `'Subscription Upgraded'`) from the backend Services (`.service.ts`), not the frontend components. This prevents ad-blockers from hiding critical revenue data.

## 2. Distinct IDs

- When firing Server-Side tracking, always track using the internal database `user.id`.
- Ensure that you pass `{ $groups: { organization: orgId } }` to properly track B2B multi-tenant behavior context in PostHog.

## 3. Performance

- Never block a database transaction waiting for the PostHog API to resolve. Send tracking events asynchronously or via queue workers (BullMQ) if they become highly complex.

## 4. Feature Flags

- Check feature flags defensively using the backend router. If PostHog fails or is unresponsive, fallback gracefully without crashing the endpoint logic.
