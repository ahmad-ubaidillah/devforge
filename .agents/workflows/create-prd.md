---
description: [CP] Create Product Requirements Document
---

# Create PRD Workflow

This workflow translates raw research and brainstorming into a structured, execution-ready Product Requirements Document (PRD) that the Sprint Planning workflow can consume.

## Phase 1: Context Aggregation

1. **Review Memory**: Check `core-memory.md` for current project status.
2. **Review Research**: Synthesize the outputs of the Market [MR], Domain [DR], and Technical [TR] research workflows if they exist.

## Phase 2: Feature Definition (The "What")

Draft the PRD outline, strictly adhering to the following structure:

- **Title**: Clear, descriptive feature or product name.
- **Problem Statement**: 1-2 sentences on what user pain point this solves.
- **Target Audience / Persona**: Who is this for?
- **Scope**: What is _in_ scope? What is explicitly _out_ of scope for this version?

## Phase 3: Technical & Design Constraints

- **Architecture Rules**: Reference the DevForge 150-line file limit, strict Separation of Concerns (Routes -> Service -> Repository), and Zod validation constraints.
- **UI/UX Strategy**: Delegate to the _UI/UX Pro Max_ skill (`workflows/ui-ux-design.md`) to define styling constraints before development starts.
- **Security / SDLT**: Define the data privacy boundaries. Do we need Row Level Security (RLS) for multi-tenancy? What variables contain Zero Secrets PII?

## Phase 4: Acceptance Criteria (The "Done")

List explicitly verifiable Acceptance Criteria (AC).
_Example:_ "AC1: When a user submits the form with invalid email format, the API returns a 400 status with a Zod validation error format instead of an unhandled internal server error stack trace."

## Output

Save the finalized PRD as a distinct markdown artifact in `tasks/prd-[feature].md`, then update `core-memory.md` to reflect the completion of the Planning Phase.
