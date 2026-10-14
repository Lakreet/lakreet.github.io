---
title: Resume a batch
description: Continue an interrupted batch using --only, --limit, --skip-existing after Ctrl+C.
type: how-to
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Resume a batch

When a render is interrupted (Ctrl+C, crash, timeout), lakreet-swarm writes a partial report. Resume where you left off.

## The problem

Render 1000 videos, fails at row 547. You don't want to re-render 1–546.

## Solution: --skip-existing

```bash
# First run (interrupted at row 547)
lakreet-swarm render --template t.ectemplate --data d.csv

# Resume: skip rows with existing output files
lakreet-swarm render --template t.ectemplate --data d.csv --skip-existing
```

- Checks `out/` for existing files
- Skips rows where output file exists
- Continues from first missing file

## Row selection: --only

Render specific rows:

```bash
# Single row
--only 547

# Multiple rows
--only 547,548,549

# Ranges
--only 547-600

# Mixed
--only 1,3,5-10,547
```

## Limit rows: --limit

Process only first N rows:

```bash
# First 100 rows
--limit 100

# Combine with --only
--only 500-600 --limit 50   # rows 500-549
```

## After Ctrl+C

Press `Ctrl+C` during render:

```
Interrupted — finishing the current render, then stopping...
```

- Current render completes
- Partial `report.json` / `report.csv` written
- Exit code `130`

Then resume:

```bash
lakreet-swarm render --template t.ectemplate --data d.csv --skip-existing
```

## Common patterns

| Scenario                   | Command                                            |
| -------------------------- | -------------------------------------------------- |
| Resume after crash         | `--skip-existing`                                  |
| Re-render failed rows only | Check `report.csv` for failures → `--only 5,12,47` |
| Test first 10 rows         | `--limit 10`                                       |
| Render rows 100–200        | `--only 100-200`                                   |
| Skip first 50, do next 10  | `--only 51-60`                                     |

## With --json (NDJSON)

```bash
lakreet-swarm render --template t.ectemplate --data d.csv --skip-existing --json
```

Streams events; filter `event: "row"` with `status: "skipped"` in your consumer.

## Next steps

- [Retries and timeouts](/swarm/guides/retries-and-timeouts) — handle flaky renders
- [Choose output](/swarm/guides/choose-output) — naming patterns affect `--skip-existing`
- [Row selection reference](/swarm/reference/selection) — full syntax
