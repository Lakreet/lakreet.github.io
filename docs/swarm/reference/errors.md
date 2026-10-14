---
title: Errors
description: Error catalog with code, cause, example message, and suggestion for each error.
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Errors

Complete error catalog from `src/errors.js`. Every user-facing failure is a `SwarmError` with stable code, exit code, and hint.

## Error catalog

| Code                    | Exit code | Cause                      | Example message                                                                       | Hint                                                                 |
| ----------------------- | --------- | -------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `E_USAGE`               | 2         | Bad command/flags          | `Unknown command "foo".`                                                              | Run with --help to see the correct usage.                            |
| `E_DATA_UNREADABLE`     | 3         | Can't read data file       | `Could not read data file "data.csv".`                                                | Check the file path and that the file is readable.                   |
| `E_DATA_INVALID`        | 3         | Validation failed          | `Found 2 problem(s) in data.csv:\n- Line 5, column "Opacity": "abc" is not a number.` | Fix the reported rows/columns, then run again.                       |
| `E_MEDIA_MISSING`       | 3         | Media file not found       | `file not found: /assets/logo.png`                                                    | Point the media column at an existing file, or set --media-dir.      |
| `E_CLI_NOT_FOUND`       | 4         | effectcraft-cli missing    | `effectcraft-cli was not found.`                                                      | Install EffectCraft, or pass --cli / set EFFECTCRAFT_CLI.            |
| `E_TEMPLATE_UNREADABLE` | 5         | Template error             | `Template has no controls to export.`                                                 | Confirm the .ectemplate exists and exports a manifest.               |
| `E_RENDER_FAILED`       | 1         | EffectCraft render failed  | `EffectCraft render failed with code 1`                                               | See the render log above.                                            |
| `E_OUT_NOT_WRITABLE`    | 1         | Output folder not writable | `Output folder "out" is not writable.`                                                | Choose an output folder you can write to (--out).                    |
| `E_CONFIG_INVALID`      | 3         | Bad config file            | `Unknown config key "foo" in lakreet.config.json.`                                    | Fix the config key named in the message.                             |
| `E_INTERRUPTED`         | 130       | Ctrl+C                     | `Interrupted — finishing the current render, then stopping...`                        | A partial report was written. Re-run with --skip-existing to resume. |

## Error format

```
Error message
  Hint: suggestion
```

Example:

```
Found 2 problem(s) in data.csv:
- Line 5, column "Opacity": "abc" is not a number.
- Line 8, column "Logo": file not found: /path/to/missing.png
  Hint: Fix the reported rows/columns, then run again.
```

## In --json mode

Errors appear in NDJSON `row` events:

```json
{
  "event": "row",
  "index": 5,
  "where": "line 6",
  "status": "failed",
  "output": null,
  "seconds": 0,
  "error": "EffectCraft render failed with code 1"
}
```

## Programmatic access

```javascript
import { isSwarmError, SwarmError } from 'lakreet-swarm/errors';

try {
  await render(...);
} catch (e) {
  if (isSwarmError(e)) {
    console.log(e.code);      // E_RENDER_FAILED
    console.log(e.exitCode);  // 1
    console.log(e.hint);      // See the render log above.
  }
}
```

## Next steps

- [Exit codes](/swarm/reference/exit-codes) — code table
- [Troubleshoot](/swarm/guides/troubleshoot) — symptom → fix mapping
- [Validate first](/swarm/guides/validate-first) — catch errors before render
