---
name: review-architecture
description: Analyze code for architectural compliance, SOLID violations, and module coupling. Use during code review for new modules, cross-package changes, or architectural decisions.
---

# Architecture Review Skill

Verify that code changes follow DevForge's architectural principles and don't introduce structural debt.

## DevForge Architecture Principles

### Core Layering (Routes → Service → Repository)

```
┌─────────────┐
│   Routes     │  ← HTTP concerns only (request/response, Zod validation)
├─────────────┤
│   Service    │  ← Business logic, orchestration, error handling
├─────────────┤
│  Repository  │  ← Data access, Drizzle queries, caching
└─────────────┘
```

**Violations to detect:**

- [ ] Business logic in `.routes.ts` files
- [ ] Direct database access in route handlers
- [ ] Repository depending on another Repository (use Service orchestrator)
- [ ] Service importing route-specific types (HTTP status codes, request objects)

### Module Boundary Compliance

Each plugin/module must be self-contained:

```
packages/plugins/{name}/files/src/modules/{module}/
├── {module}.routes.ts      ← HTTP endpoints
├── {module}.service.ts     ← Business logic
├── {module}.repository.ts  ← Data access (optional)
├── {module}.schema.ts      ← Zod schemas
└── {module}.types.ts       ← TypeScript types
```

**Violations to detect:**

- [ ] Cross-module imports bypassing the service layer
- [ ] Shared mutable state between modules
- [ ] Circular dependencies between packages
- [ ] God service files that orchestrate too many concerns

## Review Checklist

### 1. SOLID Principles

- [ ] **Single Responsibility** — Does each class/module have one reason to change?
- [ ] **Open/Closed** — Can behavior be extended without modifying existing code?
- [ ] **Liskov Substitution** — Can subtypes be used interchangeably with their base types?
- [ ] **Interface Segregation** — Are interfaces focused, or do they force unused implementations?
- [ ] **Dependency Inversion** — Do high-level modules depend on abstractions, not concrete implementations?

### 2. Coupling Analysis

- [ ] **Afferent coupling (Ca)** — How many modules depend on this one? (High = fragile)
- [ ] **Efferent coupling (Ce)** — How many modules does this depend on? (High = coupled)
- [ ] **Instability (I = Ce / (Ca + Ce))** — Stable modules should be abstract, unstable ones concrete

### 3. Package Dependencies

- [ ] Do `packages/plugins/*` only depend on `packages/core`?
- [ ] Does `packages/cli` only depend on `packages/core`?
- [ ] Does `packages/gui` only depend on `packages/core`?
- [ ] Are there any circular package dependencies?

### 4. Error Boundary Design

- [ ] Are errors caught at the right layer? (Service catches, routes format response)
- [ ] Do errors propagate with meaningful context?
- [ ] Are there try-catch blocks in every service method?
- [ ] Do repository errors get translated into domain errors?

### 5. Scalability Patterns

- [ ] Is the code horizontally scalable? (No in-memory state assumptions)
- [ ] Are database operations idempotent where needed?
- [ ] Is there proper separation between read and write paths?
- [ ] Are long-running operations delegated to queues (BullMQ)?

## Output Format

```markdown
### Architecture Review

**Verdict:** {COMPLIANT | NEEDS_REFACTOR | ARCHITECTURE_VIOLATION}

**Findings:**

- 🔴 P1: {architectural violation that must be fixed}
- 🟡 P2: {structural concern to address}
- 🔵 P3: {improvement opportunity}

**Dependency Analysis:**

- New dependencies introduced: {list}
- Cross-boundary violations: {list}
- Coupling assessment: {LOW | MEDIUM | HIGH}
```
