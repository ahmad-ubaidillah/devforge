---
name: review-simplicity
description: Detect YAGNI violations, over-engineering, and unnecessary complexity in code. Use during code review to ensure solutions are appropriately minimal.
---

# Code Simplicity Reviewer

Analyze code changes for over-engineering, unnecessary abstraction, and YAGNI violations. The best code is the simplest code that solves the problem.

## Review Checklist

### 1. YAGNI Violations

Look for features or abstractions built for hypothetical future use:

- [ ] **Unused parameters** — Functions accepting arguments they never use
- [ ] **Premature abstraction** — Generic interfaces when only one implementation exists
- [ ] **Speculative generality** — Code designed for scenarios that don't exist yet
- [ ] **Feature flags without features** — Toggle infrastructure with no toggle

**Ask:** "Is this solving a problem we have today, or a problem we might have someday?"

### 2. Over-Abstraction

Look for unnecessary layers that add complexity without value:

- [ ] **Wrapper classes that only delegate** — Does this class add behavior, or just forward calls?
- [ ] **Excessive inheritance** — Is there a simpler composition approach?
- [ ] **Abstract factories for single products** — Do we need this level of indirection?
- [ ] **Strategy pattern with one strategy** — Just use the implementation directly

**Rule of Three:** Don't abstract until you see the pattern three times.

### 3. Code Volume

Check against DevForge's 150-line file limit:

- [ ] Files exceeding 150 lines should be split by responsibility
- [ ] Functions exceeding 30 lines should be decomposed
- [ ] Deeply nested conditionals (> 3 levels) should be flattened
- [ ] Copy-paste duplication should be extracted into shared utilities

### 4. Simplification Opportunities

- [ ] Can any `if/else` chains be replaced with early returns?
- [ ] Can complex logic be expressed as data (maps, lookups) instead of code?
- [ ] Are there redundant null checks that Zod validation already handles?
- [ ] Can async chains be simplified with `await` instead of `.then()`?

## Output Format

```markdown
### Simplicity Review

**Verdict:** {PASS | NEEDS_SIMPLIFICATION}

**Findings:**

- 🔴 P1: {critical over-engineering}
- 🟡 P2: {should simplify}
- 🔵 P3: {minor cleanup}

**Suggested Simplifications:**

1. {File: description of simplification}
2. {File: description of simplification}
```

## Philosophy

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

The simplest solution that passes all tests is the best solution.
