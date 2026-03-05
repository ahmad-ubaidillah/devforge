---
name: SolidJS Best Practices
description: Reactivity architecture and state management for SolidJS
---

# SolidJS Skill Guide

SolidJS is the primary frontend framework for DevForge dashboard templates. It relies on fine-grained reactivity WITHOUT a Virtual DOM.

## 1. Never Destructure Props!

Solid's reactivity is tied to property access. If you destructure props in the function signature or body, you break reactivity entirely.

```tsx
// ❌ WRONG
function MyComponent({ title }) {
  return <h1>{title}</h1>;
}

// ✅ CORRECT
function MyComponent(props) {
  return <h1>{props.title}</h1>;
}
```

## 2. State Management (Signals vs Stores)

- Use **Signals** (`createSignal`) for simple, flat primitives (strings, booleans, ints).
  ```typescript
  const [count, setCount] = createSignal(0);
  ```
- Use **Stores** (`createStore`) for nested objects and complex state (like a list of tasks or user profiles). Stores use proxy tracking, so you access them directly without a function call: `store.users[0].name`.
  ```typescript
  const [state, setState] = createStore({ tasks: [] });
  // Updates use specific syntax:
  setState("tasks", state.tasks.length, { id: 1, text: "New" });
  ```

## 3. Control Flow Components

Avoid using `.map()` inside Solid JSX. Always use the built-in `<For>` and `<Show>` components. The compiler optimizes them for DOM manipulation.

```tsx
import { For, Show } from "solid-js";

<Show when={props.isReady} fallback={<Loading />}>
  <ul>
    <For each={props.items}>{(item) => <li>{item.name}</li>}</For>
  </ul>
</Show>;
```

## 4. Derived State

Use `createMemo` for expensive derived calculations, not `createEffect`. Only use `createEffect` for true side-effects (like modifying the DOM directly or syncing with a server).
