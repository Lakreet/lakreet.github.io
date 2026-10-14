---
title: Retries and timeouts
description: Handle failed or hanging renders with --retries, --timeout, and --fail-fast options.
type: how-to
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Retries and timeouts

Handle flaky renders, hangs, and fail-fast behavior.

## Retries: --retries

Extra attempts for failed renders:

```bash
# Retry each failed row up to 2 extra times (3 total attempts)
lakreet-swarm render --template t.ectemplate --data d.csv --retries 2
```

![Render progress with Pac-Man bar](/img/guides/render-progress.png)

- Applies per-row
- Each retry is a full re-render
- Report shows final status after all retries

**Report entry after retry:**

```json
{
  "index": 5,
  "where": "line 6",
  "status": "ok",
  "output": "out/5-Budi.mp4",
  "seconds": 18.2,
  "error": null,
  "retries": 1
}
```

## Timeout: --timeout

Kill renders that hang (seconds):

```bash
# Kill any render exceeding 60 seconds
lakreet-swarm render --template t.ectemplate --data d.csv --timeout 60
```

- Uses `SIGTERM` then `SIGKILL` on the EffectCraft process
- Row marked as `failed` with timeout error
- Other rows continue (unless `--fail-fast`)

## Fail fast: --fail-fast

Stop entire batch at first failure:

```bash
lakreet-swarm render --template t.ectemplate --data d.csv --fail-fast
```

- Exit code `1` immediately on first failure
- Partial report written
- Useful for CI: fail fast, don't waste compute

## Combined example

```bash
lakreet-swarm render \
  --template template.ectemplate \
  --data data.csv \
  --retries 2 \
  --timeout 120 \
  --fail-fast \
  --skip-existing
```

**Behavior:**

1. Skip existing outputs
2. Each row: max 3 attempts (original + 2 retries)
3. Each attempt: max 120 seconds
4. First final failure → stop batch, exit 1

## When to use

| Option        | Use case                                                 |
| ------------- | -------------------------------------------------------- |
| `--retries`   | Transient GPU/driver issues, network filesystem blips    |
| `--timeout`   | EffectCraft hangs on certain templates, prevent stuck CI |
| `--fail-fast` | CI pipelines, catch regressions early                    |

## Exit codes with retries

| Scenario                      | Exit code |
| ----------------------------- | --------- |
| All succeeded (after retries) | 0         |
| Some failed after all retries | 1         |
| `--fail-fast` triggered       | 1         |
| Timeout on last retry         | 1         |
| Ctrl+C during retry           | 130       |

## Next steps

- [Resume a batch](/swarm/guides/resume-batches) — `--skip-existing`, `--only`
- [Use in CI](/swarm/guides/use-in-ci) — exit codes, reports in pipelines
- [Render reference](/swarm/reference/cli/render) — all options
