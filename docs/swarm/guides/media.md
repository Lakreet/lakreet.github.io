---
title: Images, GIFs and footage
description: Media replacement is not supported yet. What happens today, why, and the planned (not scheduled) approach.
type: how-to
status: planned
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Images, GIFs and footage

> **Status: Planned — not available in v0.2.0**

## What happens today

Media replacement is not supported in lakreet-swarm.

- A data column that maps to a media control stops `check` and `render` before rendering with error `E_MEDIA_UNSUPPORTED` (exit code 3).
- A media control with no data column keeps the template's default media.

EffectCraft's `--values` cannot replace media. Verified: it fails with `invalid parameters for prop.set: can't use ... for a scalar property`.

## Planned, not scheduled

EffectCraft has an engine command `essential.set` (reachable through `effectcraft-cli exec`) that accepts a media `item`. lakreet-swarm does not use it. Whether a per-row pipeline (load the template into a project, set the media item, render the project) is feasible and fast enough has not been evaluated.

## Workarounds

- Use one template per media variant and render them separately.
- Render with the template's default media and replace it in post-production.
- Use text, number, and checkbox controls only.

## Next steps

- [Limitations](/swarm/concepts/limitations) — current gaps
- [Control types](/swarm/reference/control-types) — supported and planned types
- [GitHub Issues](https://github.com/Lakreet/lakreet-swarm/issues) — track feature requests
