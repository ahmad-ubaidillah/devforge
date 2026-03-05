---
name: Drizzle ORM Best Practices
description: Database schema patterns, queries, and relation management in Drizzle
---

# Drizzle ORM Skill Guide

Drizzle is the backend ORM mapped to Postgres in DevForge. Ensure database definitions are strictly typed and relational queries are modeled correctly.

## 1. Schema Definitions Separated from Relations

Use `drizzle-orm/pg-core` to define schemas. Keep table definitions clean and isolated from their relationship mappings.

```typescript
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.integer().primaryKey(),
  name: p.text().notNull(),
});

export const posts = p.pgTable("posts", {
  id: p.integer().primaryKey(),
  content: p.text().notNull(),
  authorId: p.integer("author_id").notNull(),
});
```

## 2. defineRelations (v2 Syntax)

Do not use old `many()` or `one()` directly on schemas. Instead, centralize all relational logic using `defineRelations({ users, posts }, (r) => ({ ... }))`.

```typescript
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations({ users, posts }, (r) => ({
  posts: {
    author: r.one.users({
      from: r.posts.authorId,
      to: r.users.id,
    }),
  },
  users: {
    posts: r.many.posts(),
  },
}));
```

## 3. Relational Queries API (`db.query`)

When fetching nested records, avoid raw SQL joins if you only need nested JSON. Use the highly optimized relational `.query` syntax via the `with` keyword.

```typescript
// Always pass the `relations` object when instantiating the drizzle client!
const db = drizzle(client, { schema, relations });

const result = await db.query.users.findMany({
  with: {
    posts: true, // Will automatically array-nest posts based on defineRelations
  },
});
```
