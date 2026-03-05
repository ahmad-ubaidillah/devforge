# DevForge Security Protocols

Security is non-negotiable in DevForge. All generated code and core CLI infrastructure must adhere to the following rules constraint-checked by the AI.

## 1. Zero Secrets Policy

- **Never** hardcode API keys, JWT secrets, database connection strings, or PII.
- Always implement logic expecting values from `process.env`.
- Ensure templates and plugins include instructions or logic to handle missing `process.env` safely.

## 2. Input Validation

- Every API endpoint and CLI argument must pass through strong structural validation using `zod`.
- No raw SQL injections. Always leverage Drizzle ORM constructs or parameterized bindings.

## 3. Web Vulnerability Prevention (Generated Apps)

- Rate limiting should be considered for `.routes.ts` files globally.
- Sanitize HTML inputs. XSS/CSRF protections must be enabled by default (e.g. `c.req.header`) where appropriate in Hono.

## 4. Safe Executions

- When writing template generators, do not execute unverified remote code or uncontrolled user input via `exec()` or `child_process`.
- Read and Write files using explicit boundary assumptions.
