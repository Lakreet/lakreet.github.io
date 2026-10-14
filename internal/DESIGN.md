# Lakreet design tokens

> Decisions made by the maintainer. Reference sites were studied for structure only; no values are copied from a single site.

## Color (light / dark)

| token         | light     | dark      | use                                    |
| ------------- | --------- | --------- | -------------------------------------- |
| brand         | #1659c4   | #74aaff   | links, primary buttons                 |
| brand-hover   | #2d81ff   | #a8caff   | hover state                            |
| brand-pressed | #0d3d8a   | #4d8fff   | active/pressed state                   |
| brand-soft    | #e8f0fe   | #1a2e4a   | soft backgrounds for brand elements    |
| bg            | #ffffff   | #121316   | page background                        |
| bg-soft       | #f2f1ee   | #101014   | cards, code blocks, secondary surfaces |
| bg-alt        | #e9e8e4   | #060607   | tertiary surfaces, dividers            |
| text          | #101014   | #f2f1ee   | body text                              |
| text-muted    | #1010149e | #f2f1ee99 | secondary text, captions               |
| text-faint    | #1010146b | #f2f1ee61 | placeholder text, disabled text        |
| border        | #10101429 | #f2f1ee26 | dividers, card borders                 |
| border-light  | #10101414 | #f2f1ee14 | subtle dividers                        |
| success       | #2d81ff   | #74aaff   | success states, positive indicators    |
| warning       | #ffb300   | #ffcc00   | warning states                         |
| danger        | #b3261e   | #ff6259   | error states, destructive actions      |

## Typography

- Sans: **Archivo** (via Google Fonts, SIL Open Font License), fallback: system-ui, sans-serif
- Mono: **Geist Mono** (via Vercel, SIL Open Font License), fallback: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
- Scale: base 16px (1rem), line height 1.5 for body, 1.2 for headings
- Heading sizes: H1: 2rem (32px), H2: 1.625rem (26px), H3: 1.375rem (22px), H4: 1.125rem (18px)
- Body: 1rem (16px)
- Caption: 0.875rem (14px)
- Small: 0.75rem (12px)

## Spacing and shape

- Spacing scale (4px base): 4, 8, 12, 16, 20, 24, 28, 32px
- Radius: sm 4px, md 8px, lg 12px
- Shadow: sm `inset 0 0 0 2px var(--vp-c-divider)`, md `rgb(45, 129, 255) 0px 0px 6px 0px`

## Motion

- Allowed: transitions for hover/focus states, subtle fade-in for content
- Duration and easing: fast 150ms ease-out, normal 250ms ease-out, slow 350ms ease-out
- With `prefers-reduced-motion`: no animation, no transitions

## Components

- Plugin card: background `bg-soft`, border `border`, radius `md`, padding `16px`, hover: shadow `md` and border `brand`
- Code block: background `bg-soft`, border `border`, radius `md`, copy button (VitePress default)
- Callout: variants `tip` (brand border + brand-soft bg), `warning` (warning border + #fff8e1 bg), `danger` (danger border + #fdeaea bg)
- Status badge: `stable` (brand-soft bg + brand text), `experimental` (warning bg + dark warning text), `planned` (bg-alt bg + text-muted text)
- Since tag: bg-alt bg + text-muted text, uppercase, small caps

## Mapping to VitePress variables

| token         | VitePress variable      |
| ------------- | ----------------------- |
| brand         | `--vp-c-brand-1`        |
| brand-hover   | `--vp-c-brand-2`        |
| brand-pressed | `--vp-c-brand-3`        |
| brand-soft    | `--vp-c-brand-soft`     |
| bg            | `--vp-c-bg`             |
| bg-soft       | `--vp-c-bg-soft`        |
| bg-alt        | `--vp-c-bg-alt`         |
| text          | `--vp-c-text-1`         |
| text-muted    | `--vp-c-text-2`         |
| text-faint    | `--vp-c-text-3`         |
| border        | `--vp-c-divider`        |
| border-light  | `--vp-c-divider-light`  |
| Sans          | `--vp-font-family-base` |
| Mono          | `--vp-font-family-mono` |
