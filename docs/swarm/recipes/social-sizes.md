---
title: Social sizes
description: Multiple output sizes from one design using naming patterns, --format, and multiple templates.
type: recipe
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Social sizes

Generate the same video in multiple aspect ratios/resolutions for different platforms.

## Strategy: Multiple templates

Create one design per aspect ratio:

| Template                | Resolution | Platform              |
| ----------------------- | ---------- | --------------------- |
| `promo-16x9.ectemplate` | 1920x1080  | YouTube, LinkedIn     |
| `promo-9x16.ectemplate` | 1080x1920  | Reels, TikTok, Shorts |
| `promo-1x1.ectemplate`  | 1080x1080  | Instagram Feed        |
| `promo-4x5.ectemplate`  | 1080x1350  | Instagram Portrait    |

## CSV data (shared)

```csv
Product Name,Price,Tagline
"Wireless Pro","Rp 2.999.000","Sound without limits"
```

## Render script

```bash
#!/bin/bash
# render-all.sh

DATA="products.csv"
BASE_NAME="promo"

# 16:9 YouTube
lakreet-swarm render --template ${BASE_NAME}-16x9.ectemplate --data $DATA \
  --name "${BASE_NAME}-yt-{index:3}-{slug:Product Name}" \
  --format h264 --out dist/16x9

# 9:16 Reels
lakreet-swarm render --template ${BASE_NAME}-9x16.ectemplate --data $DATA \
  --name "${BASE_NAME}-reels-{index:3}-{slug:Product Name}" \
  --format h264 --out dist/9x16

# 1:1 Instagram
lakreet-swarm render --template ${BASE_NAME}-1x1.ectemplate --data $DATA \
  --name "${BASE_NAME}-ig-{index:3}-{slug:Product Name}" \
  --format h264 --out dist/1x1

# 4:5 Instagram Portrait
lakreet-swarm render --template ${BASE_NAME}-4x5.ectemplate --data $DATA \
  --name "${BASE_NAME}-ig-portrait-{index:3}-{slug:Product Name}" \
  --format h264 --out dist/4x5
```

## Output structure

```
dist/
├── 16x9/
│   ├── promo-yt-001-wireless-pro.mp4
│   └── ...
├── 9x16/
│   ├── promo-reels-001-wireless-pro.mp4
│   └── ...
├── 1x1/
│   ├── promo-ig-001-wireless-pro.mp4
│   └── ...
└── 4x5/
    ├── promo-ig-portrait-001-wireless-pro.mp4
    └── ...
```

## Alternative: Single template + resolution

If design adapts, use `--resolution`:

```bash
lakreet-swarm render --template promo.ectemplate --data data.csv \
  --resolution half --out dist/half
```

But separate templates give full layout control per platform.

## CI integration

```yaml
# .github/workflows/social-sizes.yml
jobs:
  render:
    strategy:
      matrix:
        size: [16x9, 9x16, 1x1, 4x5]
    steps:
      - run: lakreet-swarm render --template promo-${{ matrix.size }}.ectemplate --data data.csv --out dist/${{ matrix.size }}
```

## Next steps

- [Choose output](/swarm/guides/choose-output) — format, resolution, naming
- [Naming patterns](/swarm/reference/naming-patterns) — tokens
- [Use in CI](/swarm/guides/use-in-ci) — matrix builds
