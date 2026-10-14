---
title: Map columns
description: Map CSV headers to template controls using lakreet.config.json columns mapping with precedence rules.
type: how-to
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Map columns

When your CSV/JSON headers don't match template control names, use `columns` mapping in `lakreet.config.json`.

## The problem

Template controls: `Source Text`, `Opacity`
Your CSV headers: `Nama`, `Ketebalan`

```csv
Nama,Ketebalan
Budi,100
Sari,60
```

## Solution: column mapping

Create `lakreet.config.json`:

```json
{
  "columns": {
    "Nama": "Source Text",
    "Ketebalan": "Opacity"
  }
}
```

Now lakreet-swarm maps `Nama` → `Source Text`, `Ketebalan` → `Opacity` automatically.

## How it works

1. Read CSV header: `Nama`
2. Look up in `columns`: found → `Source Text`
3. Validate against template control: `Source Text` exists ✓
4. Coerce value for `Source Text` (text type)

## Priority order

Column resolution follows this precedence:

1. **CLI flag** `--data` (file path)
2. **Config file** `lakreet.config.json` → `columns`
3. **Environment** — not applicable for columns
4. **Default** — header name used as-is

## In JSON/JSONL

Same mapping applies — object keys are treated like CSV headers:

```json
{ "Nama": "Budi", "Ketebalan": 100 }
```

Mapped to `Source Text`, `Opacity` via config.

## Multiple headers to one control

Not supported. One CSV header → one control. If you need merging, preprocess your data.

## Validation

Unmapped headers that don't match any control = error:

```
Column "Unknown" is not a control of the template. Available: Source Text, Opacity
```

Mapped headers that don't exist in CSV = silently ignored (no error).

## Example: Indonesian Excel export

```json
// lakreet.config.json
{
  "template": "template.ectemplate",
  "data": "data.csv",
  "delimiter": ";",
  "columns": {
    "Nama Lengkap": "Source Text",
    "Tingkat Ketebalan": "Opacity",
    "Aktif": "Visible"
  }
}
```

## Next steps

- [Prepare a CSV](/swarm/guides/data-csv) — delimiter, BOM, quoting
- [Configuration reference](/swarm/reference/config) — all config keys
- [Validate first](/swarm/guides/validate-first) — catch mapping errors early
