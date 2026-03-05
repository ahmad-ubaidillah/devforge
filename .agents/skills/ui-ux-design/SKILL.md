---
name: UI/UX Design System Intelligence
description: High-end, cohesive web architecture (Style, Color, Typography, Charts, UX) based on UI/UX Pro Max standards.
---

# UI/UX Design System Intelligence

You are equipped with the design intelligence from the **UI/UX Pro Max** methodology. This skill empowers you to architect modern, hyper-cohesive, and accessible web application interfaces without relying on vanilla or basic components.

When you design for DevForge, never use generic aesthetics (red, green, blue). You MUST deliver an **editorial** or **premium SaaS** aesthetic using curated colors and precise typography.

## 1. Design System Selection (The "Pro Max" Workflow)

Before building any frontend feature, determine these core tokens based on the project context:

### A. Style Selection

Determine the primary aesthetic style (e.g., Glassmorphism, B&W Brutalism, Neo-Brutalism, Clean Minimalism, Aurora, or Dark Mode).

- **SaaS / Dashboard:** Clean Minimalism or Dark Mode (for readability over 8 hours). Focus on typography hierarchy and subtle borders/shadows (`border-subtle` design token).
- **Consumer App:** Aurora or Glassmorphism for engaging, emotional experiences.
- **Developer Tools:** Dark Mode, Monospace Accents, High Contrast.

### B. Color Logic

Do not use raw hex colors in components. Always map them to CSS variables globally.

- `primary`: The driving brand color (e.g., highly saturated teal or deep indigo).
- `secondary`: A complementary desaturated tone.
- `background`: Avoid `#FFFFFF` or `#000000`. Use `#FAFAFC` (light) or `#09090B` (dark).
- `surface`: Slightly elevated from background (e.g., `#FFFFFF` in light mode, `#18181B` in dark mode).

### C. Typography

Select a Google Fonts pairing that fits the style:

- **Clean SaaS:** Inter (Heading & Body) or Roboto.
- **Editorial / Premium:** Playfair Display (Heading) + Lato (Body).
- **Tech / Dev:** Fira Code (Accents) + Inter (Body).

## 2. Component Architecture

- **Semantic HTML First:** Use `<dialog>`, `<nav>`, `<aside>`, `<time>`, etc., over generic `<div>` soup.
- **Accessibility (a11y) Check:** Every interactive component must have:
  - `aria-label` or `aria-labelledby`.
  - `role` attributes if not using semantic HTML.
  - `tabindex="0"` correctly scoped.
  - `:focus-visible` styling (never rely on default browser outlines).

## 3. UX Guidelines

Implement these interactions on every feature:

- **Micro-interactions:** Add subtle layout shifts or background color transitions on hover (duration: `300ms`, `ease-out`).
- **Feedback Loops:** User actions (click, submit, delete) require instantaneous feedback (loading state, toast notification, shake animation).
- **Empty States:** Never show a blank table or an empty space. Always use an illustration or copy like "No documents created yet. [Create First Document]."
- **Destructive Actions:** Require a double-confirm modal with the word "delete" typed out for significant data deletion.

## 4. Stack Optimization

For **DevForge (SolidJS / Astro / Preact)**:

- Do not use React-specific un-optimized hooks. Focus on fine-grained reactivity.
- Reduce layout shifts (CLS) by pre-allocating height for images or lazy-loaded components.
- Use native CSS Grid for layouts; avoid complex calc() math when native CSS handles it.
