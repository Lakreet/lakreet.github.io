---
title: Limitations
description: "Current limitations: media replacement not available, supported control types, tested mainly on Windows."
type: explanation
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Limitations

Honest list of what lakreet-swarm **cannot** do in v0.2.0.

## Media replacement

**Not supported yet.** A data column that maps to a media control stops `check` and `render` before rendering with error `E_MEDIA_UNSUPPORTED` (exit code 3). A media control with no data column keeps the template's default media. EffectCraft's `--values` cannot replace media (verified: it fails with `invalid parameters for prop.set: can't use ... for a scalar property`). EffectCraft's `essential.set` engine command accepts a media `item`, but lakreet-swarm does not use it. Whether a per-row pipeline is feasible and fast enough has not been evaluated. Status: planned, not scheduled.

- [Media guide](/swarm/guides/media) — status & workarounds
- [Control types](/swarm/reference/control-types) — planned media type

## Supported control types only

| Supported | EffectCraft property               |
| --------- | ---------------------------------- |
| text      | Source Text                        |
| slider    | Opacity, Position, Scale, Rotation |
| checkbox  | Checkbox Control                   |

| Not supported | Status                  |
| ------------- | ----------------------- |
| color         | Planned                 |
| point         | Planned                 |
| media         | Planned (not scheduled) |

Unknown types fall back to text (no crash, but may not work as intended).

## Windows-centric testing

- Primary development: Windows 11
- CI tests: Ubuntu, Windows, macOS
- Real-world usage: mostly Windows
- Linux/macOS may have edge cases (paths, display, fonts)

## No parallel rendering

Sequential only. Tested 1.11x with 2 workers (below 1.5x threshold). See [Performance](/swarm/concepts/performance).

## EffectCraft version sensitivity

EffectCraft is alpha. Breaking changes between versions possible. lakreet-swarm tracks tested versions in `compat.json` and warns via `doctor`.

## No GUI

CLI only. For batch automation, not interactive editing.

## Template size

`.ectemplate` includes full EffectCraft project (project.ecproj). Large templates = large ZIPs (10MB+). Not optimized for sharing.

## Next steps

- [Roadmap](/swarm/concepts/roadmap) — planned features
- [Media guide](/swarm/guides/media) — media replacement status
- [Compatibility](/swarm/reference/compatibility) — tested matrix
