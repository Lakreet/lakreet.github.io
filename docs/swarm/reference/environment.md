---
title: Environment
description: Environment variables, CLI search order, platform notes.
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Environment

## Environment variables

| Variable          | Purpose                            | Example                                            |
| ----------------- | ---------------------------------- | -------------------------------------------------- |
| `EFFECTCRAFT_CLI` | Path to effectcraft-cli executable | `C:\Program Files\EffectCraft\effectcraft-cli.exe` |
| `PATH`            | Standard executable search path    | Includes EffectCraft install folder                |

## CLI search order

lakreet-swarm finds `effectcraft-cli` in this order:

1. **`--cli <path>`** flag — exact path, no fallback
2. **`EFFECTCRAFT_CLI`** env var — exact path, no fallback
3. **`effectcraft-cli` on `PATH`** — standard lookup
4. **Default Windows install** — `C:\Program Files\EffectCraft\effectcraft-cli.exe`

> If you use `--cli` or `EFFECTCRAFT_CLI`, that exact path **must exist**. No silent fallback.

## Platform notes

### Windows (primary tested)

- Full support
- Default install: `C:\Program Files\EffectCraft\`
- PACMAN progress bar in TTY (cmd, PowerShell, Windows Terminal)
- Reserved filename handling (CON, COM1, etc.)

### Linux

- Requires EffectCraft Linux build
- May need virtual display (Xvfb) for headless CI
- Progress bar works in TTY

### macOS

- Requires EffectCraft macOS build
- Progress bar works in TTY
- Tested on Apple Silicon and Intel

## Node.js

- **Required:** Node 20+
- Tested: 20, 22, 24
- Uses native `node:util` `parseArgs` (no external deps)

## File paths

- Relative paths resolved from **current working directory**
- Output folder (`--out`) created if missing

## Next steps

- [Install guide](/swarm/guides/install) — setup & verification
- [Doctor reference](/swarm/reference/cli/doctor) — environment diagnostics
- [Compatibility](/swarm/reference/compatibility) — tested matrix
