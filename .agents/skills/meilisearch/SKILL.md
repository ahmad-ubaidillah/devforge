---
name: MeiliSearch Integration
description: Unified search abstraction, indexing, and querying with Meilisearch.
---

# MeiliSearch Best Practices

DevForge uses Meilisearch for its Unified Search Abstraction.

## 1. Driver-Based Search

- Do not hardcode Meilisearch SDK calls in controllers. Meilisearch is simply one driver inside the `SearchService`. Always interact through the generalized service interface.
- DevForge requires a PostgreSQL fallback (`pg_trgm`) if Meilisearch fails. Keep search queries simple.

## 2. Syncing & EventBus

- Data indexing should never block the main thread.
- When an entity (e.g., User, Project) is updated via a repository, fire an EventBus event. A background BullMQ worker should sync that change to the Meilisearch index.

## 3. Schema & Filtering

- Explicitly define `filterableAttributes` and `sortableAttributes` on index creation.
- Ensure `organization_id` or similar tenant keys are strictly filtered in Meilisearch searches to enforce Multi-Tenancy security boundaries.
