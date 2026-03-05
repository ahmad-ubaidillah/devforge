---
name: Better Auth Best Practices
description: Identity, sessions, and security integrations using Better Auth.
---

# Better Auth Best Practices

DevForge standardizes authentication using `better-auth` paired with the `@better-auth/drizzle-adapter`.

## 1. Stateless Authentication Flow

- DevForge backend services (Hono) are designed to be stateless. Do not rely on server memory for sessions.
- Always use Better Auth's session validation at the Route layer (`.routes.ts`) before passing user context to the `.service.ts`.

## 2. The Drizzle Adapter Constraint

- Authentication tables (`users`, `sessions`, `accounts`, `verifications`) MUST be managed through the standard Drizzle schemas inside `auth/db/schema.ts`.
- Never bypass the Better Auth API to manually manipulate session tokens in Drizzle.

## 3. Zero Secrets & ENV Requirements

- `BETTER_AUTH_SECRET` must be validated by Zod at startup.
- Never log user credentials or session tokens.

## 4. Multi-Tenancy Boundary

- Better Auth identifies the user, but application multitenancy requires the `organization_id` check. Always verify the authenticated user has access to the requested `organization_id` using Row Level Security (RLS) or explicit tenant query scopes.
