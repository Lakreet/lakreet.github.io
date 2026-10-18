---
title: Lower thirds
description: Lower third graphics for speakers with name and title controls.
type: recipe
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Lower thirds

Create lower third graphics for video interviews, presentations, streams.

## Template controls

| Control name  | Type | Description                |
| ------------- | ---- | -------------------------- |
| Speaker Name  | text | Full name                  |
| Speaker Title | text | Role, company, affiliation |

> A per-row organization logo is **not possible yet**: media replacement is not supported. See [Media guide](/swarm/guides/media).

## CSV example

```csv
Speaker Name,Speaker Title
Budi Santoso,CTO, TechCorp
Sari Dewi,Lead Data Scientist, DataLab
Andi Wijaya,Founder, StartupXYZ
```

## Command

```bash
lakreet-swarm render \
  --template lower-third.ectemplate \
  --data speakers.csv \
  --format h264 \
  --name "LT-{index:3}-{slug:Speaker Name}" \
  --resolution half
```

## Output

```
out/LT-001-budi-santoso.mp4
out/LT-002-sari-dewi.mp4
out/LT-003-andi-wijaya.mp4
```

## Variations

| Variation      | Change                                |
| -------------- | ------------------------------------- |
| News ticker    | Add `Scrolling Text` control          |
| Social handle  | Add `Twitter Handle`, `LinkedIn` text |
| Multi-language | Duplicate template per language       |

## Next steps

- [Choose output](/swarm/guides/choose-output) — formats and resolution
- [Media guide](/swarm/guides/media) — media replacement status
- [Social sizes](/swarm/recipes/social-sizes) — multiple resolutions
