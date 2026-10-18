---
title: Configuration
description: All lakreet.config.json keys, types, defaults, precedence, and examples.
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Configuration

`lakreet.config.json` sets defaults for all commands. CLI flags override config.

## File location

1. `--config <path>` explicit path
2. `lakreet.config.json` in current working directory
3. None (use defaults)

## All keys

| Key              | Type    | Default             | Description                                            |
| ---------------- | ------- | ------------------- | ------------------------------------------------------ |
| `template`       | string  | `null`              | Template path (required for render/check/preview/init) |
| `data`           | string  | `null`              | Data file path (required for render/check/preview)     |
| `out`            | string  | `"out"`             | Output folder                                          |
| `name`           | string  | `"{index}-{first}"` | Output naming pattern                                  |
| `columns`        | object  | `{}`                | CSV header → control name mapping                      |
| `render`         | object  | `{}`                | Render options (format, quality, resolution, etc.)     |
| `jobs`           | number  | `1`                 | Reserved (not implemented)                             |
| `delimiter`      | string  | `null`              | Force CSV delimiter (`,`, `;`, `\t`)                   |
| `keepValues`     | boolean | `false`             | Keep per-row `.values.json` files                      |
| `emptyAsDefault` | boolean | `false`             | Empty text cells → template default                    |

## render object

```json
{
  "render": {
    "format": "h264",
    "quality": "best",
    "resolution": "full",
    "fps": 30,
    "bitrate": 5000,
    "audio": "auto"
  }
}
```

Same keys as CLI flags (without `--`).

## Example

```json
{
  "template": "templates/lower-third.ectemplate",
  "data": "data/episodes.csv",
  "out": "dist/videos",
  "name": "{index:3}-{slug:Episode Title}",
  "columns": {
    "Guest Name": "Source Text",
    "Guest Title": "Title"
  },
  "render": {
    "format": "h264",
    "quality": "best",
    "resolution": "half"
  },
  "delimiter": ";",
  "keepValues": true,
  "emptyAsDefault": true
}
```

## Precedence

**CLI > Config file > Defaults**

```bash
# Config: out = "dist"
# CLI: --out ./custom
# Result: ./custom
```

## Validation

Unknown keys = error:

```
Unknown config key "foo" in lakreet.config.json.
```

## Next steps

- [Map columns](/swarm/guides/map-columns) — `columns` mapping guide
- [Choose output](/swarm/guides/choose-output) — render options
- [Environment](/swarm/reference/environment) — env vars
- [CLI reference](/swarm/reference/cli/render) — all flags
