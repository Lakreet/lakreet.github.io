---
title: Greeting videos
description: Personalized greeting videos with text name, number, checkbox controls.
type: recipe
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Greeting videos

Create personalized greeting videos for a list of recipients.

## Template controls

| Control name   | Type     | Description             |
| -------------- | -------- | ----------------------- |
| Recipient Name | text     | Person's name           |
| Age            | slider   | Age number (optional)   |
| Show Confetti  | checkbox | Toggle confetti overlay |

## CSV example

```csv
Recipient Name,Age,Show Confetti
Budi,25,true
Sari,30,false
Andi,28,true
Rina,22,false
```

## Command

```bash
lakreet-swarm render \
  --template greeting.ectemplate \
  --data recipients.csv \
  --name "{index:3}-{slug:Recipient Name}"
```

## Output

```
out/001-budi.mp4
out/002-sari.mp4
out/003-andi.mp4
out/004-rina.mp4
```

## Variations

| Variation   | Change                                        |
| ----------- | --------------------------------------------- |
| Birthday    | Add Birth Date text control                   |
| Anniversary | Add Years slider                              |
| Corporate   | Add Company text, Logo media (when supported) |

## Next steps

- [Your first batch](/swarm/learn/first-batch) — similar workflow
- [Prepare a CSV](/swarm/guides/data-csv) — CSV format details
- [Naming patterns](/swarm/reference/naming-patterns) — custom output names
