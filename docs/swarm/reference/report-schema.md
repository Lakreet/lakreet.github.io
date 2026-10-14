---
title: Report schema
description: Schema of report.json, report.csv columns, NDJSON event types, and real examples.
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Report schema

Every render batch produces `report.json` and `report.csv` in the output folder.

## report.json

```json
{
  "tool": "lakreet-swarm",
  "version": "0.2.0",
  "effectcraft": "0.8.0",
  "startedAt": "2026-10-14T10:00:00.000Z",
  "finishedAt": "2026-10-14T10:05:30.000Z",
  "template": "templates/main.ectemplate",
  "data": "data/input.csv",
  "summary": {
    "total": 100,
    "succeeded": 98,
    "failed": 2,
    "skipped": 0
  },
  "rows": [
    {
      "index": 1,
      "where": "line 2",
      "status": "ok",
      "output": "out/1-Budi.mp4",
      "seconds": 15.5,
      "error": null
    },
    {
      "index": 5,
      "where": "line 6",
      "status": "failed",
      "output": null,
      "seconds": 30.1,
      "error": "EffectCraft render failed with code 1"
    }
  ]
}
```

### Fields

| Field       | Type        | Description                       |
| ----------- | ----------- | --------------------------------- |
| tool        | string      | Always "lakreet-swarm"            |
| version     | string      | lakreet-swarm version             |
| effectcraft | string/null | EffectCraft version (from doctor) |
| startedAt   | ISO 8601    | Batch start time                  |
| finishedAt  | ISO 8601    | Batch end time                    |
| template    | string      | Template path                     |
| data        | string      | Data file path                    |
| summary     | object      | Counts                            |
| rows[]      | array       | Per-row details                   |

### Row object

| Field   | Type        | Description                            |
| ------- | ----------- | -------------------------------------- |
| index   | number      | 1-based row number                     |
| where   | string      | "line N" (CSV) or "item N" (JSON)      |
| status  | string      | "ok", "failed", "skipped"              |
| output  | string/null | Output file path (relative to out dir) |
| seconds | number/null | Render duration                        |
| error   | string/null | Error message if failed                |

## report.csv

```csv
index,where,status,output,seconds,error
1,line 2,ok,out/1-Budi.mp4,15.5,
5,line 6,failed,,30.1,"EffectCraft render failed with code 1"
```

### Columns

| Column  | Description                                            |
| ------- | ------------------------------------------------------ |
| index   | 1-based row number                                     |
| where   | Source location (line/item)                            |
| status  | ok/failed/skipped                                      |
| output  | Output file (empty if failed/skipped)                  |
| seconds | Duration (empty if failed/skipped)                     |
| error   | Error message (quoted if contains comma/quote/newline) |

## NDJSON events (--json)

Streaming events to stdout.

### Event: start

```json
{ "event": "start", "total": 100 }
```

### Event: row

```json
{
  "event": "row",
  "index": 1,
  "where": "line 2",
  "status": "ok",
  "output": "out/1-Budi.mp4",
  "seconds": 15.5,
  "error": null
}
```

### Event: done

```json
{
  "event": "done",
  "total": 100,
  "succeeded": 98,
  "failed": 2,
  "skipped": 0
}
```

## Real example (from internal/facts/example-report.json)

```json
{
  "tool": "lakreet-swarm",
  "version": "0.2.0",
  "effectcraft": null,
  "startedAt": "2026-10-14T11:57:19.180Z",
  "finishedAt": "2026-10-14T11:58:37.595Z",
  "template": "examples/title2.ectemplate",
  "data": "examples/data.csv",
  "summary": { "total": 5, "succeeded": 5, "failed": 0, "skipped": 0 },
  "rows": [
    {
      "index": 1,
      "where": "line 2",
      "status": "ok",
      "output": "out/1-Budi.mp4",
      "seconds": 15.5,
      "error": null
    },
    {
      "index": 2,
      "where": "line 3",
      "status": "ok",
      "output": "out/2-Sari.mp4",
      "seconds": 15.3,
      "error": null
    },
    {
      "index": 3,
      "where": "line 4",
      "status": "ok",
      "output": "out/3-Andi.mp4",
      "seconds": 16.0,
      "error": null
    },
    {
      "index": 4,
      "where": "line 5",
      "status": "ok",
      "output": "out/4-Rina.mp4",
      "seconds": 16.5,
      "error": null
    },
    {
      "index": 5,
      "where": "line 6",
      "status": "ok",
      "output": "out/5-A_B.mp4",
      "seconds": 15.1,
      "error": null
    }
  ]
}
```

## Next steps

- [Use in CI](/swarm/guides/use-in-ci) — parsing reports in pipelines
- [Exit codes](/swarm/reference/exit-codes) — batch-level status
- [CLI render](/swarm/reference/cli/render) — --json flag
