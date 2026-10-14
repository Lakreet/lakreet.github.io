---
title: Images, GIFs and footage
description: Media replacement is not yet available. Current status, reason (EffectCraft --values does not replace media), planned work, and link to tracking issue.
type: how-to
status: planned
since: 0.2.0
---

# Images, GIFs and footage

> **Status: Planned — not available in v0.2.0**

## Current limitation

EffectCraft's `--values` flag **does not replace media** (images, videos, GIFs). It only drives text, slider, and checkbox controls.

Media replacement requires EffectCraft's **pipeline mode** (`essential.set`), which is a different code path not yet exposed via CLI in a way lakreet-swarm can use.

## What works today

- Media **validation**: lakreet-swarm checks that media file paths exist (via CSV column or `--media-dir`)
- Media **references** in template: manifest lists media placeholders
- Static media: Footage/images baked into the template render as-is

## What doesn't work

| Feature                                                 | Status           |
| ------------------------------------------------------- | ---------------- |
| Swap image per row (e.g., different logo per video)     | ❌ Not supported |
| Swap footage per row (e.g., different background video) | ❌ Not supported |
| Swap GIF per row                                        | ❌ Not supported |
| Dynamic media via CSV column                            | ❌ Not supported |

## Workarounds

1. **Multiple templates** — One template per media variant, render separately
2. **Post-process** — Render with placeholder, replace media in post (ffmpeg, etc.)
3. **Single template, no media swap** — Use static media only

## Planned

Track progress: [GitHub Issue #XXX](https://github.com/Lakreet/lakreet-swarm/issues/XXX) (to be created)

Planned approach:

1. Add `essential.set` support to `effectcraft-cli` (upstream)
2. Extend lakreet-swarm to use pipeline mode for media rows
3. Add `media` control type with file path validation

## Next steps

- [Templates concept](/swarm/concepts/templates) — media in manifest
- [Control types reference](/swarm/reference/control-types) — planned media type
- [GitHub Issues](https://github.com/Lakreet/lakreet-swarm/issues) — watch for updates
