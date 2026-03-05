# UI/UX & Design Constraint Rule

You must strictly enforce **UI/UX Pro Max** standards for _all_ graphical, UI, and front-end outputs in DevForge. You are absolutely forbidden from generating generic, unstyled, or poorly-considered interfaces without explicit user override.

## Core Mandates

1. **No Default Toggles:** Never use the browser's default `<input type="checkbox">` or radio styles. Provide custom CSS variables, SVG checks, or a Switch abstraction with transition effects (`ease-in-out`, `transform translate-x`).
2. **Padding Hierarchy:** White space is critical. Elements must follow an iterative scale (e.g., `p-4`, `p-6`, `p-8`). If nesting cards, the inner element must have a smaller radius than the outer container (`rounded-lg` inside `rounded-xl`).
3. **Contrast:** Gray-on-gray (`#999999` text on `#EEEEEE` background) is forbidden. Use `#555555` minimum for light mode secondary text. Ensure contrast is 4.5:1.
4. **Data Empty States:** Do not present empty tables `<tbody></tbody>`. Always render an empty state message with a prompt to create/add data.
5. **Chart Implementation:** When rendering data viz, never use high-saturation pure colors across a pie or bar graph. Use muted, analogous, or carefully selected diverging color palettes driven by custom tokens, with thin tooltips on hover.
6. **Focus State:** Always define `:focus-visible` with a clear outline or ring (`ring-2 ring-primary ring-offset-2`). Do not rely on native browser outlines for premium SaaS applications.
