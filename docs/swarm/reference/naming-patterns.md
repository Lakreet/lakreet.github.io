---
title: Naming patterns
description: "Output name tokens {index}, {index:N}, {first}, {Column}, {slug:Column} and collision handling."
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Naming patterns

The `--name` pattern (or config `name`) controls output file names.

## Tokens

| Token           | Example        | Description                              |
| --------------- | -------------- | ---------------------------------------- |
| `{index}`       | `1`            | 1-based row number                       |
| `{index:N}`     | `001`          | Zero-padded to N digits                  |
| `{first}`       | `Budi`         | First column value (sanitized)           |
| `{Column}`      | `Budi`         | Any column value (sanitized)             |
| `{slug:Column}` | `budi-santoso` | Lowercase, accents removed, spaces → `-` |

## Examples

| Pattern                        | Row 1 (Source Text: "Budi Santoso") | Row 2 (Source Text: "Sari Dewi") |
| ------------------------------ | ----------------------------------- | -------------------------------- |
| `{index}-{first}`              | `1-Budi`                            | `2-Sari`                         |
| `{index:3}-{first}`            | `001-Budi`                          | `002-Sari`                       |
| `{index}-{Source Text}`        | `1-Budi Santoso`                    | `2-Sari Dewi`                    |
| `{index:3}-{slug:Source Text}` | `001-budi-santoso`                  | `002-sari-dewi`                  |
| `ep{index:3}-{slug:Episode}`   | `ep001-pilot-episode`               | `ep002-season-premiere`          |

## Sanitization rules

All token values (except `{index}`) are sanitized:

1. **Windows reserved names** → prefixed with `_`: `CON` → `_CON`, `COM1` → `_COM1`
2. **Invalid chars** `< > : " / \ | ? *` and control chars → `_`
3. **Trailing dots/spaces** → removed
4. **Max length** → 60 chars

## Collision handling

Duplicate names after sanitization get `-2`, `-3`, … appended:

```
1-Budi.mp4
2-Budi.mp4
3-Budi-2.mp4
4-Budi-3.mp4
```

## Default pattern

```
{index}-{first}
```

## Config file

```json
{
  "name": "{index:3}-{slug:Source Text}"
}
```

CLI flag overrides: `--name "{index:3}-{slug:Source Text}"`

## Next steps

- [Choose output](/swarm/guides/choose-output) — format, quality, folder
- [Row selection](/swarm/reference/selection) — --only, --limit
- [Resume a batch](/swarm/guides/resume-batches) — --skip-existing uses output names
