---
description: [TR] Technical Research Facilitation
---

# Technical Research Workflow

To investigate the feasibility, architecture options, and technology stack choices before committing to a PRD.

## Phase 1: Constraints Evaluation

1. What is the expected load or payload size?
2. What is the acceptable latency budget?

## Phase 2: Option Generation

Provide 2-3 technical approaches. For example, if evaluating a queue system:

- Option A: Redis Pub/Sub
- Option B: BullMQ + Redis
- Option C: Postgres-based worker tables

## Phase 3: Matrix Comparison

Compare the generated options against the constraints established:

- Developer Experience
- Dependency Graph Impact (Will this require new massive Node libraries?)
- Performance
- Time-to-market

Provide the definitive recommendation to the Architect agent.
