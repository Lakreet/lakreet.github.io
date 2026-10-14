---
title: Exit codes
description: "Table of process exit codes: 0=OK, 1=render failed, 2=usage, 3=invalid data, 4=CLI not found, 5=template unreadable, 130=interrupted."
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Exit codes

| Code | Constant              | Meaning                    | When                                              |
| ---- | --------------------- | -------------------------- | ------------------------------------------------- |
| 0    | `OK`                  | All succeeded              | Render complete, no failures                      |
| 1    | `RENDER_FAILED`       | At least one render failed | EffectCraft returned non-zero                     |
| 2    | `USAGE`               | Invalid command/flags      | Bad args, unknown command, missing required flags |
| 3    | `DATA_INVALID`        | Validation failed          | `check` failed, or `render` with invalid data     |
| 4    | `CLI_NOT_FOUND`       | effectcraft-cli missing    | Not in PATH, not installed, `--cli` wrong         |
| 5    | `TEMPLATE_UNREADABLE` | Template error             | Corrupt ZIP, missing manifest, version mismatch   |
| 130  | `INTERRUPTED`         | Ctrl+C (SIGINT)            | User interrupted, partial report written          |

## Usage in scripts

```bash
lakreet-swarm render --template t.ectemplate --data d.csv
CODE=$?

case $CODE in
  0) echo "Success";;
  1) echo "Render failed — check report.json";;
  2) echo "Usage error — run with --help";;
  3) echo "Bad data — run check first";;
  4) echo "Install EffectCraft or set --cli";;
  5) echo "Template corrupt or unreadable";;
  130) echo "Interrupted — resume with --skip-existing";;
  *) echo "Unknown exit code: $CODE";;
esac

exit $CODE
```

## CI integration

GitHub Actions:

```yaml
- name: Render
  run: lakreet-swarm render --template t.ectemplate --data d.csv
  # Non-zero exit fails the step automatically
```

## With --fail-fast

Exit code 1 on first failure (no retry, no continue).

## With --retries

Exit code 1 only if **all retries exhausted** for a row.

## Next steps

- [Errors reference](/swarm/reference/errors) — error codes & messages
- [Use in CI](/swarm/guides/use-in-ci) — scripting patterns
- [Troubleshoot](/swarm/guides/troubleshoot) — exit code → fix mapping
