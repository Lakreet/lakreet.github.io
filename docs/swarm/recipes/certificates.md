---
title: Certificates
description: Certificate videos with name, date, title controls.
type: recipe
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Certificates

Generate personalized certificate videos for courses, events, achievements.

## Template controls

| Control name   | Type | Description                              |
| -------------- | ---- | ---------------------------------------- |
| Recipient Name | text | Full name                                |
| Course Title   | text | Course/event name                        |
| Issue Date     | text | Formatted date (e.g., "14 Oktober 2026") |
| Certificate ID | text | Unique code (optional)                   |

## CSV example

```csv
Recipient Name,Course Title,Issue Date,Certificate ID
Budi Santoso,Python Fundamentals,14 Oktober 2026,CRT-2026-001
Sari Dewi,Data Science Bootcamp,14 Oktober 2026,CRT-2026-002
Andi Wijaya,Web Development,14 Oktober 2026,CRT-2026-003
```

## Command

```bash
lakreet-swarm render \
  --template certificate.ectemplate \
  --data graduates.csv \
  --name "CERT-{Certificate ID}-{slug:Recipient Name}"
```

## Output

```
out/CERT-CRT-2026-001-budi-santoso.mp4
out/CERT-CRT-2026-002-sari-dewi.mp4
out/CERT-CRT-2026-003-andi-wijaya.mp4
```

## Variations

| Variation     | Change                               |
| ------------- | ------------------------------------ |
| Award         | Add `Award Title`, `Presenter Name`  |
| Compliance    | Add `Expiry Date`, `Regulation Code` |
| Digital badge | Export as PNG (use `--format png`)   |

## Next steps

- [Naming patterns](/swarm/reference/naming-patterns) — custom tokens
- [Choose output](/swarm/guides/choose-output) — PNG for badges
- [Validate first](/swarm/guides/validate-first) — check data
