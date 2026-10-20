# Attribution

## Fonts

All fonts in `docs/public/fonts/` are self-hosted and licensed under the
SIL Open Font License (OFL 1.1), which permits redistribution. They were
downloaded from Google Fonts by `scripts/fetch-fonts.mjs`.

| File(s)                  | Font family    | License | Source       |
| ------------------------ | -------------- | ------- | ------------ |
| `oswald-*.woff2`         | Oswald         | OFL 1.1 | Google Fonts |
| `inter-*.woff2`          | Inter          | OFL 1.1 | Google Fonts |
| `jetbrains-mono-*.woff2` | JetBrains Mono | OFL 1.1 | Google Fonts |

Oswald (c) Vernon Adams, Kalapi, or James Johnson.
Inter (c) The Inter Project Authors.
JetBrains Mono (c) JetBrainsUU s.r.o.

To update them, run: `bun scripts/fetch-fonts.mjs`

## Design reference

The landing page visual language (deep plates, paper surfaces,
mono uppercase kickers, numbered feature sections, boxed 3px-radius buttons)
is adapted from the design tokens extracted from
`design-refs/hermes-agent-design` (SkillUI). Structure only — no received
text, code, images, fonts or logos from that site are used here. The color
palette itself is the maintainer's mint theme (Frozen Mint `#DDF8F1`,
Emerald Teal `#008573`), not the reference site's colors.

## Other assets

- `docs/public/img/**` — screenshots and diagrams produced for this project.
- `docs/public/data/*.json`, `docs/public/examples/*.ectemplate` — generated
  from lakreet-swarm facts (see `internal/facts/`).
