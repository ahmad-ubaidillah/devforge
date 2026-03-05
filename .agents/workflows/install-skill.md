---
description: [IS] Install Skill Module Workflow
---

# Install Skill Module Workflow

To ensure DevForge can scale its AI agent capabilities, you can install third-party or first-party "Skill Packs" via this workflow.

## Phase 1: Identify Module Source

1. Request the module source from the User (e.g., a GitHub repository, a local path, or a DevForge Marketplace URL).
2. Download or clone the source material into a temporary directory if necessary.

## Phase 2: Schema Validation

A valid DevForge Module must contain a `module.yaml` file defining:

- `code`: The namespace
- `name`: Human-readable name
- `skills`: A list of markdown files containing context intelligence.
- `workflows`: A list of markdown files governing execution.

Parse the YAML file to ensure these fields exist. Give a validation report if it fails.

## Phase 3: Registration

1. Map the `skills` strings and copy the respective files into `.agents/skills/[code]/`.
2. Map the `workflows` strings and copy their contents into `.agents/workflows/`.
3. Update `core-memory.md` recognizing the newly enabled module capabilities so the Orchestrator agent understands its extended toolset.
