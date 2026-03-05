# Architecture Constraints & Feature Modules

This project relies on a strictly decoupled architecture. AI assistants must preserve these boundaries.

## 1. Feature-Based Modularity

All features within generated projects (and inside the `DevForge` core when applicable) must be structured into independent modules.

```
src/modules/
  ├ auth/
  │  ├ auth.controller.ts
  │  ├ auth.service.ts
  │  ├ auth.repository.ts
  │  ├ auth.routes.ts
  │  └ auth.validator.ts
```

## 2. Separation of Concerns (SoC)

**Strict Rules:**

- **Routes (`.routes.ts`)**: HTTP layer. Bind endpoints, attach permissions (`// @permission auth.read`), invoke controller logic. Do NOT put business logic here.
- **Controller (`.controller.ts`)**: Handles request mapping, parses Zod body, serializes response.
- **Service (`.service.ts`)**: Core Business logic. Agnostic to HTTP/req/res objects. Can throw `DevForgeError`.
- **Repository (`.repository.ts`)**: Database/ORM layer. Never return full Drizzle/Prisma models straight to the frontend; map them if needed. This is the only place SQL/Drizzle runs.
- **Validator (`.validator.ts`)**: Zod types defining inputs/outputs for the feature.

## 3. Dependency Graph Rules

DevForge guards against circular dependencies using `dependency-graph.ts` (A -> B -> A).

- Repositories may never depend on other Repositories.
- Controllers may never depend on other Controllers.
- Services can call other Services, but graph must remain acyclic.

## 4. Single Source of Truth

Avoid "prop drilling" on the frontend (SolidJS/React). State should flow predictably. Avoid duplicate logic definitions across files.
