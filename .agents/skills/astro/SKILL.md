---
name: Astro Best Practices
description: Core concepts and component architecture for the Astro web framework
---

# Astro Skill Guide

Astro is a server-first web framework optimized for content-driven websites. When generating or modifying Astro code in DevForge templates (e.g., Landing Page), adhere to these best practices:

## 1. Zero-JS by Default & Islands architecture

Astro components (`.astro`) strip all JavaScript by default. Only add client-side JavaScript when interaction is expressly required.

When embedding UI frameworks (SolidJS, React) inside Astro, you MUST explicitly hydrate them using Client Directives:

- `client:load`: Hydrate immediately on page load (High priority UI).
- `client:visible`: Hydrate only when scrolled into the viewport (Images, heavy widgets below fold).
- `client:only="solid-js"`: Render exclusively on the client (Bypasses SSR).

```astro
---
import InteractiveButton from '../components/InteractiveButton.tsx';
---
<!-- Will not run JS until visible -->
<InteractiveButton client:visible />
```

## 2. Component Structure

- Frontmatter runs on the server (build time or SSR).
- Use the `---` fence to write TypeScript/fetch data.
- Map over arrays directly inside the HTML using JSX-like syntax (`{items.map(i => <li/>)}`).
- Use the `class:list` directive for dynamic tailwind classes.

## 3. SEO & Performance

Astro's main advantage is speed. Do not load heavy client-libraries globally. Keep the `<head>` clean and use Astro Content Collections for type-safe static markdown management if applicable.
