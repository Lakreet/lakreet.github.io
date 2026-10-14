---
title: Use JSON or JSONL
description: Use JSON array or JSONL/NDJSON for data input with native type preservation.
type: how-to
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Use JSON or JSONL

JSON formats preserve native types (numbers, booleans) — no quoting or delimiter issues.

## JSON (`.json`)

**Array of objects:**

```json
[
  { "Source Text": "Budi", "Opacity": 100 },
  { "Source Text": "Sari", "Opacity": 60 },
  { "Source Text": "Andi", "Opacity": 25 }
]
```

**Object with `rows` key:**

```json
{
  "rows": [
    { "Source Text": "Budi", "Opacity": 100 },
    { "Source Text": "Sari", "Opacity": 60 }
  ]
}
```

### Type preservation

| JSON value        | Becomes in EffectCraft      |
| ----------------- | --------------------------- |
| `"Budi"` (string) | `text` control → `"Budi"`   |
| `100` (number)    | `slider` control → `100`    |
| `true` (boolean)  | `checkbox` control → `true` |
| `75.5` (float)    | `slider` control → `75.5`   |

No coercion needed — types flow directly.

## JSONL / NDJSON (`.jsonl`, `.ndjson`)

One JSON object per line. Ideal for large datasets (streaming, no memory pressure).

```jsonl
{"Source Text": "Budi", "Opacity": 100}
{"Source Text": "Sari", "Opacity": 60}
{"Source Text": "Andi", "Opacity": 25}
```

- Empty lines ignored
- Each line must be valid JSON
- Line numbers in errors = JSONL line number

## Validation

Same validation as CSV: every object key must match a control (or be mapped). Extra keys = error.

```bash
lakreet-swarm check --template template.ectemplate --data data.json
lakreet-swarm check --template template.ectemplate --data data.jsonl
```

## When to use which

| Format | Best for                                                 |
| ------ | -------------------------------------------------------- |
| CSV    | Spreadsheets, Excel export, human editing                |
| JSON   | Programmatic generation, native types, small–medium data |
| JSONL  | Large datasets, streaming, log pipelines, 10k+ rows      |

## Mixed types in one file

All objects must have the same keys (or missing keys = empty). Missing keys for `slider`/`checkbox` = validation error unless `--empty-as-default`.

## Next steps

- [Prepare a CSV](/swarm/guides/data-csv) — if you prefer spreadsheets
- [Map columns](/swarm/guides/map-columns) — remap keys to control names
- [Data formats reference](/swarm/reference/data-formats) — full specification
