---
name: lakreet-design
description: Visual and layout rules for the Lakreet documentation site (tokens, typography, components, motion). Use when creating or changing pages, components or styles.
---

# Lakreet design rules

The source of truth is `internal/DESIGN.md`. Read it before changing any style.

## Rules

- Use only the tokens defined in `internal/DESIGN.md`. Do not introduce new colors, fonts or spacing values.
- Map tokens to VitePress CSS variables in `docs/.vitepress/theme/custom.css` using the mapping table in `internal/DESIGN.md`.
- Support light and dark modes. Text contrast must be at least 4.5:1.
- Respect `prefers-reduced-motion`: no animation when the user asks for less motion.
- Components must work with the keyboard and expose accessible names.
- Cards (plugins, recipes) follow the card pattern in `internal/DESIGN.md`.
- Do not copy layout, text, code, images or branding from other websites.
- Do not use ArtCraft, EffectCraft or Adobe logos or wordmarks.