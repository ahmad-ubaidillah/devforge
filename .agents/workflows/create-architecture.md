---
description: [CA] Create Architecture Workflow
---

# Create Architecture Workflow

Drafting high-level technical decisions systematically prevents long-term tech debt in DevForge infrastructure. This workflow guides the DB Engineer and Back-End Architect.

## Step 1: System Scope Validation

1. Identify the boundaries of the feature: is it an internal utility, a new public API route, a frontend component, or a full plugin?
2. Enforce the `Architecture Constraints`: Every feature must maintain strict Separation of Concerns (Routes -> Service -> Repository).

## Step 2: Component Breakdown & Dependency Rules

1. **API Layers**: Detail the request payload structures (Zod schema suggestions).
2. **Database Models**: Define the table schemas, foreign keys, and indexes using Drizzle ORM primitives.
3. **Circular Constraints**: Verify that no Repositories depend on other Repositories. Ensure a 1-way dependency tree.

## Step 3: Performance Constraints Analysis

1. **Big O**: Briefly analyze expected data scaling (e.g., this query must not exceed O(n log n)).
2. **Cache Policy**: Propose aggressive caching if reading frequently.

## Step 4: Finalize Design

Output the architecture summary into the `tasks/` folder (or relevant PRD) explicitly linking API payloads, Database Models, and the logical business layers. Ensure you refer to standard DevForge patterns.
