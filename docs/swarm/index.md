---
title: lakreet-swarm
description: Render many videos from one EffectCraft template and a CSV/JSON file.
type: hub
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# lakreet-swarm

Render many videos from one [EffectCraft](https://github.com/storytold/effectcraft) template and a CSV/JSON file.

You design a video once in EffectCraft, mark the parts that should change (a title, an opacity, a media file, …), and `lakreet-swarm` renders one video per row of your data file. No window, no clicking, no editing each copy by hand.

> **Unofficial.** lakreet-swarm is an independent project. It is not affiliated with, sponsored by, or endorsed by the Storytold team or the EffectCraft project. It only calls the `effectcraft-cli` program that ships with EffectCraft.

> **Status: v0.2.0 — early.** EffectCraft itself is alpha software, and so is this tool. It has been tested on Windows (primary), Linux, and macOS with EffectCraft 0.8.0.

## Quick start

```sh
# Clone the repo to get example files
git clone https://github.com/Lakreet/lakreet-swarm.git
cd lakreet-swarm

# Render 5 videos from the example template and CSV
npx lakreet-swarm render --template examples/title2.ectemplate --data examples/data.csv
```

You will get one video per data row in the `out` folder.

## What it does

- **Validates every row** before rendering — catch errors early with line numbers
- **Resumes interrupted batches** — `--skip-existing` picks up where you left off
- **Reports everything** — `report.json` and `report.csv` with per-row timings and errors
- **Previews instantly** — `preview` renders one PNG frame per row for visual checks
- **Generates starter CSV** — `init` creates a ready-to-fill CSV from your template

## Commands

| Command   | Purpose                                             |
| --------- | --------------------------------------------------- |
| `render`  | Render a batch of videos                            |
| `check`   | Validate template + data without rendering          |
| `inspect` | Show template controls, media, and composition info |
| `init`    | Generate a starter CSV from a template              |
| `preview` | Quick PNG frame per row (visual check)              |
| `doctor`  | Environment diagnostics                             |

## Requirements

- [EffectCraft](https://github.com/storytold/effectcraft) installed (includes `effectcraft-cli`)
- [Node.js](https://nodejs.org) 20 or newer

## Install

```sh
npm install -g lakreet-swarm
# or run locally without installing:
npx lakreet-swarm ...
```

## Documentation sections

- **Learn** — Step-by-step tutorials to build your first batch, make a template, and create personalized videos
- **Guides** — How-to guides for specific tasks (install, data prep, validation, preview, CI, troubleshooting)
- **Reference** — Complete CLI reference, configuration, data formats, control types, naming, exit codes, errors
- **Concepts** — Explanations of how it works, templates, validation, performance, security, limitations
- **Recipes** — Real-world scenarios: greeting videos, product promos, certificates, scoreboards, lower thirds, social sizes
- **Tools** — In-browser CSV generator (no upload, no storage)

## Compatibility

| lakreet-swarm | EffectCraft | Node       | OS                    |
| ------------- | ----------- | ---------- | --------------------- |
| 0.2.0         | 0.8.0       | 20, 22, 24 | Windows, Linux, macOS |

Run `lakreet-swarm doctor` to check your environment against the compatibility matrix.

## Next steps

- [Your first batch](/swarm/learn/first-batch) — 5 videos in 10 minutes
- [Install](/swarm/guides/install) — Get set up and verified
- [Prepare a CSV](/swarm/guides/data-csv) — Data file format details
