---
title: Roadmap
description: Public roadmap summary.
type: explanation
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Roadmap

High-level direction for lakreet-swarm. Not a commitment — priorities shift based on feedback and EffectCraft changes.

## v0.3 (near term)

- **Media replacement** — pipeline mode integration for image/footage swap per row
- **Color & point control types** — full coercion + validation
- **Config file v2** — schema versioning, migrations
- **Plugin system** — hooks for custom validators, namers, reporters
- **Watch mode** — `render --watch` re-renders on data/template change

## v0.4 (mid term)

- **Parallel rendering** — if benchmark exceeds 1.5x threshold
- **Template validation** — `check --template-only` validates template without data
- **Dry-run reports** — `render --dry-run` outputs report.json without rendering
- **JSON Schema export** — `inspect --schema` outputs JSON Schema for data validation

## v1.0 (stability)

- **Stable API** — semver guarantee for CLI, config, reports
- **EffectCraft 1.0 compatibility** — when EffectCraft exits alpha
- **Documentation complete** — all pages written, reviewed, translated
- **Plugin ecosystem** — 3+ official plugins

## Ongoing

- **EffectCraft version tracking** — update compat.json per release
- **Performance monitoring** — CI benchmarks, regression detection
- **Security audits** — dependency review, fuzzing
- **Community plugins** — discoverable in `/plugins/`

## How to influence

- **GitHub Issues** — feature requests, bug reports
- **Discussions** — design debates, use cases
- **PRs** — code contributions welcome
- **Feedback** — "I need X for my workflow" drives priority

## Next steps

- [Unofficial project](/swarm/concepts/unofficial) — relationship with EffectCraft
- [Limitations](/swarm/concepts/limitations) — current gaps
- [GitHub Issues](https://github.com/Lakreet/lakreet-swarm/issues) — vote on features
