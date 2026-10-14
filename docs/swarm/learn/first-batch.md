---
title: Your first batch
description: Create 5 videos in 10 minutes using the example template and CSV.
type: tutorial
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Your first batch

In this tutorial you'll render 5 personalized videos from an EffectCraft template and a CSV file in under 10 minutes.

## Prerequisites

- **Node.js 20+** — `node --version` should show `v20.x.x` or higher
- **EffectCraft 0.8.0** — installed (includes `effectcraft-cli`)
- **lakreet-swarm** — installed globally or run via `npx`

```bash
# Verify Node
node --version
# v20.18.0 (or higher)

# Verify lakreet-swarm
lakreet-swarm --version
# 0.2.0
```

## Step 1: Get the example files

Clone the repo to get the example template and CSV:

```bash
git clone https://github.com/Lakreet/lakreet-swarm.git
cd lakreet-swarm
```

You now have:

- `examples/title2.ectemplate` — EffectCraft template with two controls: **Source Text** (text) and **Opacity** (slider)
- `examples/data.csv` — 5 rows of data

## Step 2: Validate before rendering

Run `check` to catch data problems before any rendering starts:

```bash
lakreet-swarm check --template examples/title2.ectemplate --data examples/data.csv
```

**Expected output:**

```
OK
  template:  examples/title2.ectemplate
  controls:  2 (Source Text, Opacity)
  data:      examples/data.csv
  rows:      5 valid
```

Exit code `0` = all good. If you see errors, fix the CSV and re-run.

## Step 3: Render the batch

```bash
lakreet-swarm render --template examples/title2.ectemplate --data examples/data.csv
```

**What happens:**

- Progress bar (Pac-Man style) with ETA
- One video per row → `out/1-Budi.mp4`, `out/2-Sari.mp4`, etc.
- Summary at the end

**Example output:**

```
Rendering 5 row(s) with /path/to/effectcraft-cli
████████████████████ 100%  [5/5] 5-A_B  0s
Done: 5 succeeded, 0 failed, 0 skipped.
```

## Step 4: Inspect the output

```bash
ls out/
# 1-Budi.mp4  2-Sari.mp4  3-Andi.mp4  4-Rina.mp4  5-A_B.mp4
```

Open any file to verify the personalized text and opacity.

## Step 5: Read the report

Every render writes a machine-readable report:

```bash
cat out/report.json | jq .
```

**Key fields:**

- `summary`: total, succeeded, failed, skipped
- `rows[]`: per-row status, output path, seconds, error (if any)

```json
{
  "tool": "lakreet-swarm",
  "version": "0.2.0",
  "template": "examples/title2.ectemplate",
  "data": "examples/data.csv",
  "summary": { "total": 5, "succeeded": 5, "failed": 0, "skipped": 0 },
  "rows": [
    { "index": 1, "where": "line 2", "status": "ok", "output": "out/1-Budi.mp4", "seconds": 15.5, "error": null },
    ...
  ]
}
```

Also available: `out/report.csv` for spreadsheets.

## What you learned

| Concept             | Command                      |
| ------------------- | ---------------------------- |
| Validate data first | `lakreet-swarm check`        |
| Render batch        | `lakreet-swarm render`       |
| Naming pattern      | `{index}-{first}` (default)  |
| Reports             | `report.json` + `report.csv` |

## Next steps

- [Prepare a CSV](/swarm/guides/data-csv) — delimiter, quoting, BOM, line numbers in errors
- [Validate first](/swarm/guides/validate-first) — catch problems before render
- [Make a template](/swarm/learn/make-a-template) — create your own EffectCraft template
