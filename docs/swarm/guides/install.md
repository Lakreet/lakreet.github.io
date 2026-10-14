---
title: Install
description: Install lakreet-swarm globally or run with npx, verify EffectCraft CLI detection, and run doctor.
type: how-to
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

lakreet-swarm is an unofficial CLI that renders many videos from one EffectCraft template and a data file. This guide covers installation, verifying the EffectCraft CLI is detected, and running the built-in environment check.

## Before you start

- Node.js 20 or later installed
- EffectCraft desktop app installed (version 0.8.0 tested)
- A terminal (PowerShell, cmd, or bash)

::: tip
EffectCraft and lakreet-swarm are separate projects. lakreet-swarm is unofficial and not affiliated with the EffectCraft developers.
:::

## Steps

### 1. Install lakreet-swarm

**Global install (recommended)**

```powershell
npm install -g lakreet-swarm
```

**Run with npx (no install)**

```powershell
npx lakreet-swarm --help
```

::: tip
Global install puts `lakreet-swarm` on your PATH. With npx you prefix every command with `npx lakreet-swarm`.
:::

### 2. Verify the CLI works

```powershell
lakreet-swarm --version
```

Expected output:

```text
0.2.0
```

### 3. Run the environment doctor

The `doctor` command checks Node, EffectCraft CLI, disk space, and folder writability.

```powershell
lakreet-swarm doctor
```

Expected output (paths and versions may differ):

```text
[PASS] Node.js 24.13.0 — >= 20
[PASS] effectcraft-cli — C:\Program Files\EffectCraft\effectcraft-cli.exe
[PASS] EffectCraft version — 0.8.0
[PASS] output folder "out" — writable
[PASS] free disk — 96.8 GB

All checks passed.
```

### 4. (Optional) Create a starter data file

The `init` command generates a CSV with the correct columns for a template.

```powershell
lakreet-swarm init --template path/to/template.ectemplate
```

Expected output:

```text
Wrote starter.csv (1 row(s), delimiter ",").
```

The file `starter.csv` contains one example row with the template's control names as headers.

## Result

You now have lakreet-swarm installed and verified. The `doctor` command confirms:

- Node.js meets the minimum version
- `effectcraft-cli` is found on PATH or in the default EffectCraft install location
- EffectCraft version is compatible (0.8.0 tested)
- The default output folder `out/` is writable
- Sufficient free disk space

## If something goes wrong

| Symptom                                        | Cause                                        | Fix                                                                             |
| ---------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------- |
| `lakreet-swarm` not found after global install | npm global bin not on PATH                   | Add `npm prefix -g` to PATH, or use `npx lakreet-swarm`                         |
| `[FAIL] effectcraft-cli` not found             | EffectCraft not installed or CLI not on PATH | Install EffectCraft, or set `--cli` path explicitly                             |
| `[FAIL] EffectCraft version` mismatch          | EffectCraft version newer/older than tested  | Check [compatibility](/swarm/reference/compatibility) or re-run `npm run smoke` |
| `[FAIL] output folder` not writable            | Permissions on current directory             | Run from a folder you own, or set `--out` to a writable path                    |
| `[FAIL] free disk` low                         | Disk full                                    | Free up space or set `--out` to a drive with space                              |

## Next steps

- [Prepare a CSV](/swarm/guides/data-csv) — create a valid data file for your first batch
- [Validate first](/swarm/guides/validate-first) — run `check` to catch problems before rendering
- [First batch tutorial](/swarm/learn/first-batch) — render 5 videos in 10 minutes end-to-end
