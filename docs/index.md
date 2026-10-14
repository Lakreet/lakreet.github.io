---
layout: home
title: Lakreet
description: Small, focused tools for open-source creative software. Design a video once, render it for every row of your data.
type: hub
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
hero:
  name: Lakreet
  text: Small, focused tools for open-source creative software
  tagline: Design a video once, render it for every row of your data.
  actions:
    - theme: brand
      text: Get started
      link: /swarm/learn/first-batch
    - theme: alt
      text: Browse plugins
      link: /plugins/
features:
  - title: Validate first
    details: Every row is checked before anything renders, with the exact line and column of each problem.
  - title: Resume and report
    details: Pick rows, skip finished videos and get a report after every batch.
  - title: Preview before you render
    details: Check one frame per row in seconds.
  - title: CSV generator
    details: Turn your template into a ready-to-fill CSV in your browser. Nothing is uploaded.
---

## How it works

```mermaid
flowchart LR
    A[EffectCraft Template\n.ectemplate] --> B[lakreet-swarm]
    C[Data File\nCSV / JSON / JSONL] --> B
    B --> D[Video 1]
    B --> E[Video 2]
    B --> F[Video N]
    B --> G[report.json\nreport.csv]
```

1. **Design** your video in EffectCraft and mark the parts that change (text, opacity, etc.) as Essential Graphics controls.
2. **Export** the template as `.ectemplate`.
3. **Prepare** a data file (CSV, JSON, or JSONL) where each column matches a control name.
4. **Run** `lakreet-swarm render --template template.ectemplate --data data.csv` — one video per row.

## Plugins

<PluginIndex />

## Compatibility

| lakreet-swarm | EffectCraft | Node | OS |
|---------------|-------------|------|-----|
| 0.2.0 | 0.8.0 | 20, 22, 24 | Windows, Linux, macOS |

> **Independent project.** Not affiliated with the ArtCraft team or the EffectCraft project.