---
title: Performance
description: Sequential render by default; measured 1.11x with 2 workers on author's machine (below 1.5x threshold, so no --jobs); progress is estimate since EffectCraft doesn't report frames during captured output; varies by machine.
type: explanation
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Performance

lakreet-swarm renders sequentially by default. Parallel execution was tested and found to provide minimal benefit.

## Benchmarks (author's machine)

| Workers     | Speedup | Notes                |
| ----------- | ------- | -------------------- |
| 1 (default) | 1.00x   | Baseline             |
| 2           | 1.11x   | Below 1.5x threshold |
| 4           | ~1.15x  | Diminishing returns  |

**Test conditions:**

- Template: 10s, 1080p, simple text + opacity
- Machine: Windows 11, 12th gen Intel, 32GB RAM, RTX 3080
- EffectCraft 0.8.0

## Why no --jobs?

The 1.11x speedup with 2 workers is **below the 1.5x threshold** for adding complexity. Factors:

1. **EffectCraft bottleneck** — Single render already uses most GPU/CPU
2. **I/O contention** — Multiple FFmpeg processes compete for disk
3. **Memory pressure** — Each EffectCraft instance loads full project
4. **Overhead** — Process spawn, temp files, coordination

## Progress estimation

Progress bar is an **estimate** because:

- EffectCraft doesn't report frame progress when stdout/stderr captured
- ETA based on average of completed renders
- First render has no baseline -> shows 0% until done

```
TTY: ████████████████████ 100%  [50/100] 50-row  2m30s
Non-TTY: Rendering 100 row(s)... [12/100] 12-row  ETA: 4m
```

## Factors affecting performance

| Factor              | Impact                                            |
| ------------------- | ------------------------------------------------- |
| Template complexity | More layers/effects = slower                      |
| Resolution          | 4K ~4x slower than 1080p                          |
| Codec               | Hardware/codec dependent — verify on your machine |
| Disk speed          | NVMe > SSD > HDD for temp files                   |
| GPU                 | Hardware encode (NVENC/QuickSync) major speedup   |

## Optimization tips

| Tip                                | Effect                    |
| ---------------------------------- | ------------------------- |
| Use `--resolution half` for drafts | 4x faster                 |
| Use `--quality draft`              | Faster encode             |
| Use H.264 with NVENC               | Hardware encode           |
| Render to NVMe                     | Faster temp I/O           |
| Close other GPU apps               | More VRAM for EffectCraft |

## Next steps

- [How it works](/swarm/concepts/how-it-works) — render pipeline
- [Choose output](/swarm/guides/choose-output) — resolution, quality, format
- [Retries and timeouts](/swarm/guides/retries-and-timeouts) — handling slow renders
