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

| Control name  | Type  | Description                        |
| ------------- | ----- | ---------------------------------- |
| Speaker Name  | text  | Full name                          |
| Speaker Title | text  | Role, company, affiliation         |
| Logo          | media | Organization logo (when supported) |

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
  --format webm \
  --name "LT-{index:3}-{slug:Speaker Name}" \
  --resolution half
```

## Output

```
out/LT-001-budi-santoso.webm
out/LT-002-sari-dewi.webm
out/LT-003-andi-wijaya.webm
```

## Variations

| Variation      | Change                                |
| -------------- | ------------------------------------- |
| News ticker    | Add `Scrolling Text` control          |
| Social handle  | Add `Twitter Handle`, `LinkedIn` text |
| Multi-language | Duplicate template per language       |

## Next steps

- [Choose output](/swarm/guides/choose-output) — WebM for transparency
- [Media guide](/swarm/guides/media) — logo support status
- [Social sizes](/swarm/recipes/social-sizes) — multiple resolutions
