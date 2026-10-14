---
title: Unofficial project
description: Relationship with EffectCraft and ArtCraft; not affiliated.
type: explanation
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Unofficial project

## Not affiliated

**lakreet-swarm is an independent, community-driven project.** It is not affiliated with, sponsored by, or endorsed by:

- The Storytold team
- The EffectCraft project
- The ArtCraft project
- Any company or organization behind EffectCraft/ArtCraft

## What it does

lakreet-swarm **only calls** the `effectcraft-cli` program that ships with EffectCraft. It:

- Reads templates via `effectcraft-cli inspect`
- Renders via `effectcraft-cli render` / `render-frame`
- Handles batching, validation, naming, reporting

It does **not**:

- Modify EffectCraft internals
- Use private APIs
- Reverse-engineer file formats (uses documented CLI)
- Bundle or redistribute EffectCraft

## Why this matters

| Aspect    | Implication                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
| Support   | Issues with lakreet-swarm -> Lakreet repo. Issues with EffectCraft -> EffectCraft repo.         |
| Updates   | EffectCraft updates may break lakreet-swarm. Check `doctor` and `compat.json`.                  |
| License   | lakreet-swarm is MIT. EffectCraft has its own license.                                          |
| Trademark | "EffectCraft", "ArtCraft" are trademarks of their owners. lakreet-swarm uses them nominatively. |

## Disclaimer

> **Independent project.** Not affiliated with the ArtCraft team or the EffectCraft project.

This disclaimer appears in:

- README
- Footer of every docs page
- Home page
- CLI help (`--help`)

## Contributing

Contributions welcome! See [Contributing](/community/contributing).

- Bug reports: include `doctor` output
- Feature requests: check [Roadmap](/swarm/concepts/roadmap) first
- PRs: follow code style, add tests

## Next steps

- [Roadmap](/swarm/concepts/roadmap) — planned features
- [Support](/community/support) — where to get help
- [Security](/swarm/concepts/security) — trust model
