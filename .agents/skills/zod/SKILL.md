---
name: Zod Data Validation
description: Boundary validation, type inferencing, and strict parsing using Zod.
---

# Zod Best Practices

Zod is the ultimate gatekeeper for the DevForge backend. All incoming and outgoing data must be parsed and typed by Zod.

## 1. Absolute Boundary Validation

- All Hono `.routes.ts` files must utilize Zod validation (`@hono/zod-openapi` or `zValidator`) for `params`, `query`, and `body`.
- Services (`.service.ts`) should receive the TypeScript inferred type (`z.infer<typeof Schema>`).

## 2. Error Formatting

- When Zod parsing fails, do not throw ugly raw stack traces to the client.
- Use explicit custom messages: `z.string().min(1, "Name cannot be empty")`.
- Format Zod errors consistently using the `DevForgeError` class structure.

## 3. Strict Schemas

- Always use `.strict()` for POST/PUT payloads to reject injection of unexpected fields into the database.
- Use `.strip()` if the external API returns noisy JSON, but you only need a subset.

## 4. Single Source of Truth

- Do not maintain separate TypeScript interfaces if a Zod schema exists. Rely exclusively on `type MyType = z.infer<typeof schema>`.
