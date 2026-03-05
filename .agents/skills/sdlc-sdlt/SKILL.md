---
name: DevForge SDLC & SDLT Framework
description: Best practices for Lifecycle Management, Security-by-Design, and Shift Left Testing.
---

# DevForge SDLC & SDLT Framework

This framework governs all development within the DevForge ecosystem, ensuring high quality, security, and predictability.

## 1. Shift Left Testing (SLT)

Testing is not the final step; it is the **first** step.

- **TDD Requirement:** For complex logic, write the test case (unit test) BEFORE the implementation.
- **Early Feedback:** Every developer (FE/BE) must run `bun lint` and `bun run typecheck` continuously.
- **QA Collaboration:** QA must be involved in the "Task Definition" phase to define the "Test Plan" before coding starts.

## 2. Secure Development Lifecycle (SDLT)

Security is integrated into every phase of the development lifecycle (Security-by-Design).

- **Inception:** Identify potential security risks (threat modeling) during the PM's "Scope & PRD" phase.
- **Development:** Use Zod for validation, sanitize all inputs, and follow the "Zero Secrets" policy.
- **Verification:** Run security-focused tests (SQLi/XSS checks) during the QA phase.
- **Deployment:** Audit environment variables and CI/CD security.

## 3. Scrum Excellence & Phase Gates

We follow a strict sequential flow to avoid regressions and technical debt.

- **Definition of Ready (DoR):** A task cannot start without:
  - Clear User Story & Acceptance Criteria.
  - Assigned Role.
  - Defined Test Plan (Shift Left).
- **Definition of Done (DoD):** A task cannot be marked done without:
  - Code reviewed (Linted/Typechecked).
  - QA verification (all tests passed).
  - Doctor report (project health is green).
  - Memory synchronized (`core-memory.md` updated).

## 4. Phase Verification Protocol

No agent may move from Phase N to Phase N+1 (or Task A to Task B) until:

1. **QA performs the verification** (using `@/tests/`).
2. **Scrum Master reviews the verification results.**
3. **Doctor utility confirms no breaking changes.**

## 5. Continuous Improvement

- Run `devforge-cli doctor` regularly.
- Update `automated-testing/SKILL.md` with new patterns found.
