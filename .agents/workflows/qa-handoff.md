---
description: Handoff from Developer to QA for verification and test generation.
---

# QA Verification and Test Generation Workflow

Use this workflow whenever a Backend or Frontend task is marked as "Done".

// turbo

1. **Developer Pre-check:** Developer runs `bun lint` and `bun run typecheck`.

2. **Handoff to QA:** QA Agent analyzes the code change.

3. **Identify Test Type:** Determine if the task requires a:
   - `tests/unit/` (Minimal requirement)
   - `tests/smoke/` (Critical path)
   - `tests/integration/` (Compound components)

4. **Verify doctor.ts Connection:** Ensure the `packages/core/src/utils/doctor.ts` remains functional and that any new dependencies or environment variables are added to its checks.

5. **Generate Unit Test:** Create the test file in `@/tests/` (absolute path: `/Users/user/Documents/New Project/DevForge/tests/`).

6. **Run Tests:** Run `bun test` or `vitest` to verify the new test passes.

7. **The "Doctor" Check:** Run the `doctor` command (if available via CLI) or execute `runDiagnostics` from `packages/core/src/utils/doctor.ts` to verify project health.

8. **SDLC/SDLT Compliance Check:** Verify that the task aligns with the **DevForge SDLC & SDLT Framework**, specifically checking for threat modeling results from the Cybersecurity agent.

9. **Update core-memory.md:** Document the test results, "Doctor" findings, and confirm the Phase Gate is cleared for the next task.
