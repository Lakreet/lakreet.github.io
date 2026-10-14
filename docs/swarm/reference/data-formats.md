---
title: Data formats
description: CSV rules (delimiter, quoting, BOM, line numbers), JSON, JSONL specifications.
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Data formats

Complete specification for CSV, JSON, and JSONL/NDJSON input.

## CSV / TSV (`.csv`, `.tsv`)

RFC 4180 compliant parser with extensions.

### Delimiter auto-detection

First line scanned for delimiter: **comma (`,`)**, **semicolon (`;`)**, **tab (`\t`)**. No config needed.

Force delimiter:

```json
// lakreet.config.json
{ "delimiter": ";" }
```

### Quoting (RFC 4180)

| Case                   | Input              | Parsed value   |
| ---------------------- | ------------------ | -------------- |
| Basic                  | `hello`            | `hello`        |
| With comma             | `"hello, world"`   | `hello, world` |
| With newline           | `"line1\nline2"`   | `line1\nline2` |
| Escaped quote          | `"He said ""Hi"""` | `He said "Hi"` |
| Leading/trailing space | `"  padded  "`     | `  padded  `   |

Quotes preserved verbatim (not stripped).

### BOM handling

UTF-8 BOM (`\uFEFF`) stripped automatically. Works with Excel "UTF-8 with BOM".

### Line numbers

Errors reference **1-based line numbers** (header = line 1):

```
Line 5, column "Opacity": "abc" is not a number.
```

### Column count

All rows must match header column count. Mismatch = error:

```
Line 8: expected 3 columns, found 4.
```

### Comment columns

Headers starting with `#` ignored:

```csv
Source Text,Opacity,#internal_id
Budi,100,row-001
```

## JSON (`.json`)

### Array of objects

```json
[
  { "Source Text": "Budi", "Opacity": 100 },
  { "Source Text": "Sari", "Opacity": 60 }
]
```

### Object with `rows` key

```json
{
  "rows": [
    { "Source Text": "Budi", "Opacity": 100 },
    { "Source Text": "Sari", "Opacity": 60 }
  ]
}
```

### Type preservation

| JSON type | Control type | Example         |
| --------- | ------------ | --------------- |
| string    | text         | `"Budi"`        |
| number    | slider       | `100`, `75.5`   |
| boolean   | checkbox     | `true`, `false` |
| null      | text         | `""` (empty)    |

Missing keys = validation error (unless `--empty-as-default` for text).

## JSONL / NDJSON (`.jsonl`, `.ndjson`)

One JSON object per line. Ideal for large datasets.

```jsonl
{"Source Text": "Budi", "Opacity": 100}
{"Source Text": "Sari", "Opacity": 60}
{"Source Text": "Andi", "Opacity": 25}
```

- Empty lines skipped
- Each line = valid JSON
- Line numbers in errors = JSONL line number

## Validation rules (all formats)

| Rule                     | Error example                       |
| ------------------------ | ----------------------------------- |
| Column matches control   | `Column "Foo" is not a control`     |
| Slider = finite number   | `"abc" is not a number`             |
| Checkbox = boolean       | `"yes" is not a boolean`            |
| Media file exists        | `file not found: /path/missing.png` |
| Required columns present | `column "Source Text" is required`  |

## Next steps

- [Prepare a CSV](/swarm/guides/data-csv) — practical guide
- [Use JSON or JSONL](/swarm/guides/data-json) — how-to
- [Map columns](/swarm/guides/map-columns) — header → control mapping
- [Control types](/swarm/reference/control-types) — input formats per type
