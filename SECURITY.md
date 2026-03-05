# Security Considerations

## 🔐 Core Security Principles

DevForge follows a "Secure by Default" philosophy.

### 1. Zero Secrets Policy

- Never hardcode API keys or PII in templates.
- All templates include `.env.example` files.
- The CLI automatically generates `.gitignore` including `.env*` files.

### 2. Dependency Management

- Pinning versions for critical security packages (e.g., `zod`, `better-auth`).
- Bun's high-performance integrity checking for all lockfiles.

### 3. Input Sanitization

- All user-provided inputs in the CLI (Project Name, etc.) are sanitized to prevent shell injection.
- Template logic uses Zod for strict runtime validation.

### 4. Permission Binding

- The Auto-Permission Binder prevents "Shadow Permissions" by enforcing that every route has a corresponding architectural permission definition.

## 🛡️ Vulnerability Reporting

If you find a security vulnerability, please do NOT open a public issue. Instead, email security@devforge.dev.
