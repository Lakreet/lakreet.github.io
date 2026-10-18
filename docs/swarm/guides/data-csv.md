---
title: Prepare a CSV
description: Create a valid CSV with correct headers, delimiter detection, BOM handling, quoting rules, and line numbers in errors.
type: how-to
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Prepare a CSV

CSV is the most common data format. lakreet-swarm uses an RFC 4180 compliant parser with auto-delimiter detection.

## Basic structure

First row = **column headers** (must match template control names).
Each subsequent row = **one video**.

```csv
Source Text,Opacity
Budi,100
Sari,60
Andi,25
Rina,80
A/B,50
```

## Delimiter auto-detection

The parser detects delimiter from the first line: **comma (`,`), semicolon (`;`), or tab (`\t`)**.

**Indonesian Excel** often uses semicolon — it just works:

```csv
Source Text;Opacity
Budi;100
Sari;60
```

No config needed. If detection fails, force it:

```bash
# In lakreet.config.json
{ "delimiter": ";" }
```

## Quoting rules (RFC 4180)

| Case                   | Example                   |
| ---------------------- | ------------------------- |
| Comma in value         | `"Smith, John",100`       |
| Newline in value       | `"Line 1\nLine 2",100`    |
| Double quote           | `"He said ""Hello""",100` |
| Leading/trailing space | `"  padded  ",100`        |

Quotes are **preserved verbatim** (not stripped) — EffectCraft receives the exact string.

## BOM (Byte Order Mark)

UTF-8 BOM (`\uFEFF`) is **automatically stripped**. Files saved from Excel with "UTF-8 with BOM" work correctly.

## Column headers = control names

Each header must match a control name from the template (or be mapped via [column mapping](/swarm/guides/map-columns)).

```csv
# Template controls: Source Text, Opacity
Source Text,Opacity
Budi,100
```

## Comment columns

Any column starting with `#` is **ignored**:

```csv
Source Text,Opacity,#internal_id
Budi,100,row-001
```

## Empty cells

| Control type | Empty cell behavior                             |
| ------------ | ----------------------------------------------- |
| `text`       | Empty string `""` (unless `--empty-as-default`) |
| `slider`     | **Error**: "empty value is not a number"        |
| `checkbox`   | **Error**: not a boolean                        |

Use `--empty-as-default` flag or config `emptyAsDefault: true` to skip text columns and use template defaults.

## Line numbers in errors

Validation errors always include the **CSV line number** (1-based, header = line 1):

```
Found 2 problem(s) in data.csv:
- Line 5, column "Opacity": "abc" is not a number.
- Line 8, column "Source Text": column "Source Text" is required.
```

A column that maps to a media control stops validation before any problem list:

```
Column "Logo" maps to a media control; media replacement is not supported yet.
  Hint: Use text, number or checkbox controls for now, or remove the column.
```

## Validation before render

Always run `check` first:

```bash
lakreet-swarm check --template template.ectemplate --data data.csv
```

## Common pitfalls

| Problem                       | Fix                                                    |
| ----------------------------- | ------------------------------------------------------ |
| "Column X is not a control"   | Match header to control name, or use `columns` mapping |
| "expected N columns, found M" | Check for missing/extra commas, unclosed quotes        |
| "is not a number"             | Slider columns need numeric values only                |
| "is not a boolean"            | Checkbox columns need true/false/yes/no/1/0/ya/tidak   |
| Indonesian Excel semicolon    | Auto-detected; or set `"delimiter": ";"` in config     |

## Next steps

- [Use JSON or JSONL](/swarm/guides/data-json) — native types, no quoting issues
- [Map columns](/swarm/guides/map-columns) — CSV header → control name mapping
- [Validate first](/swarm/guides/validate-first) — catch problems before render
