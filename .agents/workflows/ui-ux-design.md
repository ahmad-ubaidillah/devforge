---
description: High-end UI Architecture Generation (UI/UX Pro Max)
---

# UI/UX Generation Workflow

Before the `FE` (Front-End) agent implements _any_ user interface code, follow these sequential steps to ensure it meets the "Pro Max" aesthetic standard. Output the decisions as a brief design summary.

## Phase 1: Context

1. **Identify Persona & Need:** What is the product type? (SaaS, internal tool, consumer-facing, ecommerce).
2. **Action Intent:** Is this a data-heavy view, an empty state, or an interactive form?

## Phase 2: Design Language (Selection)

1. **Select Theme Style:** Choose a coherent style (e.g., Clean Dashboard, Neo-Brutalism, Editorial SaaS).
2. **Define Colors:** Output the hex variables to be used for `primary`, `background`, `surface`, `border`, `destructive`, and `muted-text`. Do NOT use default colors.
3. **Typography:** Confirm the Heading and Body combination. Define a `font-medium` or `font-semibold` treatment for specific UI labels.

## Phase 3: Layout & Polish

1. **Layout Strategy:** Decide whether this module employs an aside (sidebar) + main grid, a flexible masonry, or centered cards.
2. **Identify Micro-interactions & Affordances:** Mention hover states for buttons, focus rings for inputs (`ring-2 ring-primary offset`), and transition classes (`duration-200 ease-out`).
3. **Data Display (Charts/Tables):** Choose visualizing patterns (e.g., sparklines over full line charts for dense tables) and ensure column headers map perfectly to the API JSON structure.

## Phase 4: Implementation Handoff

Upon completing these steps, the `FE` agent must execute the creation of the components ensuring perfect responsiveness (mobile-first), dark mode compatibility, and zero accessibility a11y regressions.
