---
name: review-patterns
description: Detect anti-patterns, design pattern misuse, and code smells. Use during code review to identify structural issues and suggest proven alternatives.
---

# Pattern Recognition Review Skill

Analyze code for anti-patterns, code smells, and design pattern misuse. Suggest proven alternatives.

## Anti-Pattern Detection

### 1. Structural Anti-Patterns

- [ ] **God Object** — A single class/module handling too many responsibilities (> 5 distinct concerns)
- [ ] **Spaghetti Code** — Tangled control flow with no clear structure or separation
- [ ] **Lava Flow** — Dead code left in because "it might be needed" — remove it
- [ ] **Golden Hammer** — Using the same tool/pattern for every problem regardless of fit
- [ ] **Copy-Paste Programming** — Duplicated logic that should be extracted

### 2. TypeScript-Specific Anti-Patterns

- [ ] **`any` abuse** — Using `any` instead of proper typing

  ```typescript
  // ❌ Anti-pattern
  function process(data: any): any { ... }

  // ✅ Proper typing
  function process(data: UserInput): ProcessedResult { ... }
  ```

- [ ] **Type assertion overuse** — Excessive `as Type` casts hiding type errors
- [ ] **Enum misuse** — Using enums where union types are more appropriate
- [ ] **Callback hell** — Nested callbacks instead of async/await chains
- [ ] **Promise constructor anti-pattern** — Wrapping existing promises in `new Promise()`

### 3. API Design Anti-Patterns

- [ ] **Chatty API** — Multiple endpoints needed for a single logical operation
- [ ] **Anemic Domain Model** — Services doing all work, domain objects are just data bags
- [ ] **Leaky Abstraction** — Internal implementation details exposed in API responses
- [ ] **Boolean trap** — Functions with boolean parameters that obscure intent

  ```typescript
  // ❌ Boolean trap
  createUser(name, true, false);

  // ✅ Options object
  createUser(name, { isAdmin: true, sendWelcome: false });
  ```

### 4. Error Handling Anti-Patterns

- [ ] **Swallowed exceptions** — Empty catch blocks that hide errors
- [ ] **Pokemon exception handling** — Catching all errors without distinction
- [ ] **Error as control flow** — Using try/catch for expected business logic paths
- [ ] **Missing error context** — Rethrowing errors without adding context

### 5. State Management Anti-Patterns

- [ ] **Mutable shared state** — Global variables or singletons with mutable state
- [ ] **Hidden state** — Functions that depend on or modify external state implicitly
- [ ] **Prop drilling** — Passing data through many layers unnecessarily
- [ ] **Temporal coupling** — Functions that must be called in a specific order without enforcement

## Positive Pattern Verification

Also check if established DevForge patterns are being followed:

- [ ] **Factory pattern** for complex object creation (plugins, templates)
- [ ] **Repository pattern** for data access (Drizzle queries)
- [ ] **Service layer** for business logic orchestration
- [ ] **Middleware pattern** for cross-cutting concerns (auth, validation, logging)
- [ ] **Dependency injection** via constructor parameters or config objects
- [ ] **Schema-first validation** with Zod at boundaries

## Output Format

```markdown
### Pattern Review

**Verdict:** {CLEAN | HAS_SMELLS | ANTI_PATTERN_DETECTED}

**Anti-Patterns Found:**

- 🔴 P1: {critical anti-pattern with concrete harm}
- 🟡 P2: {code smell that should be addressed}
- 🔵 P3: {minor pattern improvement}

**Positive Patterns Verified:**

- ✅ {Pattern properly applied}
- ✅ {Convention followed}

**Refactoring Suggestions:**

1. {Current pattern} → {Recommended pattern} [{effort}]
2. {Current pattern} → {Recommended pattern} [{effort}]
```
