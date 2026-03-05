---
name: Automated Testing & QA Handoff
description: Standardized procedures for creating, organizing, and verifying tests in the DevForge ecosystem.
---

# Automated Testing & QA Handoff

This skill defines how the QA Role should handle the transition from "Code Ready" to "Verified".

## 1. Test Directory Structure

All tests must be placed within the `tests/` directory at the project root.

- `tests/unit/`: Logic-independent tests for individual functions or components.
- `tests/smoke/`: Quick end-to-end checks for critical paths.
- `tests/integration/`: Verifying interaction between multiple modules.

## 2. Test Format

- Use **Vitest** for unit and integration tests.
- Filename pattern: `[feature].test.ts` or `[feature].spec.ts`.
- Ensure tests are lightweight and fast.

## 3. The "Doctor" Connection

The project contains a `doctor.ts` utility (located in `packages/core/src/utils/doctor.ts`).

- **Check for existence:** The doctor utility should verify that the `tests/` directory and its subfolders exist.
- **Verification:** When running `doctor`, it should report on the health of the testing environment.

## 4. QA Protocol

1. **Identify Changes:** Analyze the PR or completed task from the Backend/Frontend agent.
2. **Draft Test Cases:** Define the edge cases and happy paths.
3. **Implement Unit Test:** Create the `.test.ts` file in the appropriate `tests/` subdirectory.
4. **Link to Doctor:** Ensure `packages/core/src/utils/doctor.ts` can detect the presence of these tests if applicable.
5. **Update Memory:** Log the verification results in `core-memory.md`.

## 5. Flutter Doctor Style Checks

The DevForge Doctor should provide a summary of:

- OS & Tooling (Bun, Node, Git).
- Environment Variables (presence of `.env`).
- Dependency Status.
- Test Coverage/Availability.

## 6. Strict Smoke Test Boundaries

- **ABSOLUTE RULE:** It is STRICTLY FORBIDDEN to create `smoke-test` folders, artifacts, or scripts outside of the `tests/` directory.
- All smoke test execution and generated artifacts MUST reside inside the `tests/` folder.
- Never pollute the root repository with generated smoke test folders.
