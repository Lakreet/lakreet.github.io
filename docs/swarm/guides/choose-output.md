---
title: Choose output
description: Select output format, quality, folder, and naming pattern with tokens.
type: how-to
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Choose output

Control format, quality, output folder, and file naming.

## Output folder: --out

```bash
lakreet-swarm render --template t.ectemplate --data d.csv --out ./dist
```

Default: `out/`

## Format: --format

```bash
# H.264 MP4 (default, verified)
--format h264
```

The CLI help also lists `webm`, `png`, `jpeg`, and `gif`. **Only `h264` has been verified.** The other values are untested; confirm them on your machine with `effectcraft-cli --help`.

## Quality: --quality

```bash
--quality best    # Highest quality (default)
--quality draft   # Faster, lower quality
```

## Resolution: --resolution

```bash
--resolution full      # 100% (default)
--resolution half      # 50%
--resolution third     # 33%
--resolution quarter   # 25%
```

Useful for previews or social media variants.

## Frame rate: --fps

```bash
--fps 30
--fps 60
```

Overrides template composition frame rate.

## Bitrate: --bitrate

```bash
--bitrate 5000   # 5000 kbps
```

Video bitrate in kbps. Higher = better quality, larger files.

## Audio: --audio

```bash
--audio auto   # Include if template has audio (default)
--audio on     # Force include
--audio off    # Strip audio
```

## Naming pattern: --name

Default: `{index}-{first}`

```bash
# Zero-padded index: 001, 002...
--name "{index:3}-{first}"

# Use column value: 001-Budi
--name "{index:3}-{Source Text}"

# Slugified: 001-budi-santoso
--name "{index:3}-{slug:Source Text}"
```

### Tokens

| Token           | Example        | Description                              |
| --------------- | -------------- | ---------------------------------------- |
| `{index}`       | `1`            | 1-based row number                       |
| `{index:N}`     | `001`          | Zero-padded to N digits                  |
| `{first}`       | `Budi`         | First column value (sanitized)           |
| `{Column}`      | `Budi`         | Any column value (sanitized)             |
| `{slug:Column}` | `budi-santoso` | Lowercase, accents removed, spaces → `-` |

### Collision handling

Duplicate names get `-2`, `-3`, … appended automatically:

```
1-Budi.mp4
2-Budi.mp4
3-Budi-2.mp4
```

### Windows reserved names

`CON`, `PRN`, `AUX`, `NUL`, `COM1`–`COM9`, `LPT1`–`LPT9` → prefixed with `_`:

```
_CON.mp4
_COM1.mp4
```

## Config file

Set defaults in `lakreet.config.json`:

```json
{
  "out": "dist",
  "name": "{index:3}-{slug:Source Text}",
  "render": {
    "format": "h264",
    "quality": "best",
    "resolution": "full"
  }
}
```

CLI flags override config.

## Next steps

- [Naming patterns reference](/swarm/reference/naming-patterns) — full token spec
- [Resume a batch](/swarm/guides/resume-batches) — `--skip-existing` matches output names
- [Social sizes recipe](/swarm/recipes/social-sizes) — multiple formats from one template
