---
name: Hono Best Practices
description: Routing and middleware structure for Hono framework
---

# Hono Framework Skill Guide

Hono is the ultra-fast routing engine used in DevForge backends.

## 1. Middleware Ordering Priority

Hono executes routes and middleware strictly in the order they are registered.

- You MUST register middleware (`app.use()`) _before_ the routes they are meant to protect.
- Global middleware (Logger, CORS) should appear at the very top of your `Hono` instance.

```typescript
const app = new Hono();

// Match any method, all routes
app.use("*", globalLogger());
// Specify method and path scope
app.post("/api/admin/*", authMiddleware());

app.get("/api/admin/data", (c) => c.json({ data: true }));
```

## 2. Avoid Heavy Controllers

To maintain Hono's powerful TypeScript inference, avoid extracting request handlers into detached "Controller" patterns if it breaks `c.req.param()` typings.

- If you extract logic, extract it into a `Service`. Keep the Hono Context (`c`) inside the route handler, and pass only the parsed payload to the Service.

```typescript
// ✅ CORRECT DevForge standard: Handlers parse, Services compute
app.post("/users/:id", async (c) => {
  const id = c.req.param("id"); // Type perfectly inferred
  const body = await c.req.parseBody();
  const result = await userService.create(id, body);
  return c.json(result);
});
```

## 3. Context Management

Pass variables locally using `c.set('key', value)` inside middleware and read it down the chain using `c.get('key')`. Use TypeScript generics on the `new Hono<{ Variables: { user: User } }>()` definition to keep it type-safe.
