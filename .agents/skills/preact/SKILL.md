---
name: Preact Best Practices
description: UI rendering, hooks, and signal-based reactivity for Preact.
---

# Preact Best Practices

DevForge supports Preact as a lightweight React alternative for specific templates. When working with Preact, adhere to these constraints:

## 1. Minimal Bundle Footprint

- Never import from `react` or `react-dom`. Always use `preact` and `preact/hooks`.
- Avoid heavy React-ecosystem libraries unless strictly necessary. If a vanilla JS alternative exists, use it.

## 2. Signals over State

- Prefer `@preact/signals` for global and complex component state instead of `useState` / `useContext`.
- Signals allow fine-grained reactivity, updating the DOM directly without full component re-renders.

## 3. Strict 150-Line Component Rule

- If a `.tsx` file approaches 150 lines, extract local hooks to a `use[Feature].ts` file, or break the view into smaller presentation components.

## 4. Class Attributes

- Preact supports `class` attributes directly instead of React's `className`. For semantic consistency in DevForge styling standards, use `class` when writing Tailwind strings.
