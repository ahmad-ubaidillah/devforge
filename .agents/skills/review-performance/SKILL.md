---
name: review-performance
description: Analyze code for performance bottlenecks, N+1 queries, memory leaks, and algorithmic inefficiency. Use during code review for service, repository, or data-processing changes.
---

# Performance Review Skill

Deep performance analysis focusing on the patterns most common in DevForge's TypeScript/Hono/Drizzle stack.

## Review Checklist

### 1. Database Query Efficiency

- [ ] **N+1 queries** — Are related records loaded in a loop instead of with a single query?

  ```typescript
  // ❌ N+1: Queries for each item
  for (const user of users) {
    const posts = await db.query.posts.findMany({
      where: eq(posts.userId, user.id),
    });
  }

  // ✅ Single query with join
  const result = await db.query.users.findMany({ with: { posts: true } });
  ```

- [ ] **Missing indexes** — Are WHERE clauses filtering on unindexed columns?
- [ ] **SELECT \* abuse** — Are we fetching all columns when only a few are needed?
- [ ] **Unbounded queries** — Are queries missing LIMIT clauses? Can they return millions of rows?

### 2. Memory & Resource Management

- [ ] **Unbounded collections** — Arrays growing without limit in memory
- [ ] **Unclosed resources** — Database connections, file handles, or streams not properly closed
- [ ] **Large payload serialization** — Serializing massive objects for logging or transport
- [ ] **Event listener leaks** — Listeners added without cleanup

### 3. Algorithmic Complexity

- [ ] **O(n²) operations** — Nested loops over data collections
- [ ] **Redundant computation** — Same value computed multiple times (should cache/memoize)
- [ ] **String concatenation in loops** — Use array join instead
- [ ] **Synchronous blocking** — CPU-heavy operations blocking the event loop

### 4. Network & I/O

- [ ] **Sequential API calls** — Multiple independent calls that could run in `Promise.all()`
- [ ] **Missing timeout** — External HTTP calls without timeout configuration
- [ ] **No retry with backoff** — Transient failures not handled
- [ ] **Excessive middleware** — Middleware chains that run for routes that don't need them

### 5. Caching Opportunities

- [ ] **Repeated expensive operations** — Same data fetched multiple times per request
- [ ] **Static data not cached** — Configuration, feature flags, or reference data fetched every time
- [ ] **Missing HTTP cache headers** — Responses that could be cached by clients

## Output Format

```markdown
### Performance Review

**Verdict:** {PASS | NEEDS_OPTIMIZATION}
**Estimated Impact:** {LOW | MEDIUM | HIGH | CRITICAL}

**Findings:**

- 🔴 P1: {will cause performance issues in production}
- 🟡 P2: {should optimize for scalability}
- 🔵 P3: {minor optimization opportunity}

**Recommendations:**

1. {File:line — description + suggested fix}
2. {File:line — description + suggested fix}
```
