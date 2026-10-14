---
title: Use in CI
description: Use lakreet-swarm in scripts and CI pipelines with exit codes, report.json, report.csv, NDJSON events, and check in pipelines.
type: how-to
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Use in CI

Integrate lakreet-swarm into CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins, etc.).

## Exit codes for scripting

| Code | Meaning             | CI action                      |
| ---- | ------------------- | ------------------------------ |
| 0    | All succeeded       | Continue                       |
| 1    | Render failed       | Fail job                       |
| 2    | Usage error         | Fail job (config issue)        |
| 3    | Invalid data        | Fail job (fix data)            |
| 4    | CLI not found       | Fail job (install EffectCraft) |
| 5    | Template unreadable | Fail job (bad template)        |
| 130  | Interrupted         | Fail job (timeout/OOM)         |

```bash
lakreet-swarm render --template t.ectemplate --data d.csv
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
  echo "Render failed with code $EXIT_CODE"
  exit $EXIT_CODE
fi
```

## Reports for CI

### report.json (machine-readable)

```json
{
  "tool": "lakreet-swarm",
  "version": "0.2.0",
  "template": "template.ectemplate",
  "data": "data.csv",
  "summary": { "total": 100, "succeeded": 98, "failed": 2, "skipped": 0 },
  "rows": [
    {
      "index": 5,
      "where": "line 6",
      "status": "failed",
      "output": null,
      "seconds": 30.1,
      "error": "EffectCraft render failed"
    }
  ]
}
```

Parse with `jq`:

```bash
FAILED=$(jq '.summary.failed' out/report.json)
if [ "$FAILED" -gt 0 ]; then
  echo "Failed rows: $FAILED"
  jq '.rows[] | select(.status=="failed") | .where' out/report.json
fi
```

### report.csv (spreadsheet)

```csv
index,where,status,output,seconds,error
1,line 2,ok,out/1-Budi.mp4,15.5,
5,line 6,failed,,30.1,"EffectCraft render failed"
```

Import to Excel/Sheets for analysis.

### NDJSON streaming (--json)

Real-time events for custom consumers:

```bash
lakreet-swarm render --template t.ectemplate --data d.csv --json | while IFS= read -r line; do
  EVENT=$(echo "$line" | jq -r .event)
  if [ "$EVENT" = "row" ]; then
    STATUS=$(echo "$line" | jq -r .status)
    echo "Row $(echo "$line" | jq .index): $STATUS"
  fi
done
```

Events: `start`, `row`, `done`.

## GitHub Actions example

```yaml
# .github/workflows/render.yml
name: Render Videos
on:
  push:
    paths: ["templates/**", "data/**"]
jobs:
  render:
    runs-on: windows-latest # EffectCraft tested on Windows
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install EffectCraft
        run: |
          # Install EffectCraft (adapt to your distribution method)
          # Example: download from releases, install to C:\Program Files\EffectCraft\

      - name: Install lakreet-swarm
        run: npm install -g lakreet-swarm

      - name: Validate data
        run: lakreet-swarm check --template templates/main.ectemplate --data data/input.csv

      - name: Render batch
        run: lakreet-swarm render --template templates/main.ectemplate --data data/input.csv --out dist --json

      - name: Upload reports
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: render-reports
          path: |
            dist/report.json
            dist/report.csv

      - name: Upload videos
        uses: actions/upload-artifact@v4
        if: success()
        with:
          name: rendered-videos
          path: dist/*.mp4
```

## Validate in PR checks

```yaml
# .github/workflows/validate.yml
on: [pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm install -g lakreet-swarm
      - run: lakreet-swarm check --template templates/main.ectemplate --data data/input.csv
```

Fast, no EffectCraft needed for validation-only.

## EffectCraft in CI

EffectCraft is a GUI app; headless rendering requires:

- Windows: Full install (tested)
- Linux/macOS: May need virtual display (Xvfb) or remote desktop

See [Compatibility](/swarm/reference/compatibility) for tested OS matrix.

## Secrets & environment

- Template/data files: commit to repo or download in CI
- EffectCraft license: handle per your org policy
- Output: upload as artifact, deploy to CDN, or push to storage

## Next steps

- [Exit codes reference](/swarm/reference/exit-codes) — full table
- [Report schema](/swarm/reference/report-schema) — JSON/CSV/NDJSON structure
- [Troubleshoot](/swarm/guides/troubleshoot) — CI-specific issues
