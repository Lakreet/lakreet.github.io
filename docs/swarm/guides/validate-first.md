---
title: Validate first
description: Run check to catch problems before rendering, read error messages, and understand exit codes.
type: how-to
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Validate first

Always run `check` before `render`. It validates template + data without rendering anything.

## Basic usage

```bash
lakreet-swarm check --template template.ectemplate --data data.csv
```

## Success output

```
OK
  template:  template.ectemplate
  controls:  2 (Source Text, Opacity)
  data:      data.csv
  rows:      5 valid
```

Exit code: `0`

## Error output

```
Found 2 problem(s) in data.csv:
- Line 3, column "Opacity": "abc" is not a number.
- Line 5, column "Source Text": column "Source Text" is required.
```

Exit code: `3` (`DATA_INVALID`)

A column that maps to a media control stops `check` before any problem list:

```
Column "Logo" maps to a media control; media replacement is not supported yet.
  Hint: Use text, number or checkbox controls for now, or remove the column.
```

Exit code: `3` (`E_MEDIA_UNSUPPORTED`)

## What gets validated

| Check                           | Example error                                                     |
| ------------------------------- | ----------------------------------------------------------------- |
| Column matches control          | `Column "Foo" is not a control of the template`                   |
| Slider = number                 | `"abc" is not a number`                                           |
| Checkbox = boolean              | `"yes" is not a boolean` (accepts true/false/yes/no/1/0/ya/tidak) |
| Media control present           | `media replacement is not supported yet`                          |
| Required columns present        | `column "Source Text" is required`                                |
| Row column count matches header | `expected 2 columns, found 3`                                     |

## Exit codes for scripting

| Code | Constant       | Meaning           |
| ---- | -------------- | ----------------- |
| 0    | `OK`           | All valid         |
| 3    | `DATA_INVALID` | Validation failed |

```bash
lakreet-swarm check --template t.ectemplate --data d.csv
if [ $? -eq 3 ]; then
  echo "Fix data before rendering"
  exit 1
fi
```

## With column mapping

Mapping in `lakreet.config.json` is applied during check:

```bash
lakreet-swarm check --template t.ectemplate --data d.csv --config lakreet.config.json
```

## Dry-run render

Alternative: `render --dry-run` does the same validation but exits 0 on success:

```bash
lakreet-swarm render --template t.ectemplate --data d.csv --dry-run
# 5 row(s) valid. Dry run: nothing rendered.
```

## In CI pipelines

```yaml
# .github/workflows/ci.yml
- name: Validate data
  run: lakreet-swarm check --template ${{ env.TEMPLATE }} --data ${{ env.DATA }}
```

Fails fast, no render cost, clear error messages.

## Next steps

- [Prepare a CSV](/swarm/guides/data-csv) — avoid common validation errors
- [Map columns](/swarm/guides/map-columns) — fix header mismatches
- [Troubleshoot](/swarm/guides/troubleshoot) — all error codes & fixes
