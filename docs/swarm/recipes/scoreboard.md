---
title: Scoreboard
description: Sports scoreboard videos from data with number and text controls.
type: recipe
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Scoreboard

Generate match scoreboard videos for sports leagues, tournaments, streams.

## Template controls

| Control name   | Type   | Description                                  |
| -------------- | ------ | -------------------------------------------- |
| Home Team      | text   | Home team name                               |
| Away Team      | text   | Away team name                               |
| Home Score     | slider | Home team score                              |
| Away Score     | slider | Away team score                              |
| Period         | text   | Quarter/Half/Set (e.g., "Q3", "HT", "Set 2") |
| Time Remaining | text   | Clock (e.g., "12:34")                        |

## CSV example

```csv
Home Team,Away Team,Home Score,Away Score,Period,Time Remaining
Lakers,Warriors,98,95,Q4,02:15
Bulls,Celtics,102,99,Q4,00:45
Heat,Knicks,87,91,Q3,05:30
```

## Command

```bash
lakreet-swarm render \
  --template scoreboard.ectemplate \
  --data matches.csv \
  --name "MATCH-{index:3}-{slug:Home Team}-vs-{slug:Away Team}"
```

## Output

```
out/MATCH-001-lakers-vs-warriors.mp4
out/MATCH-002-bulls-vs-celtics.mp4
out/MATCH-003-heat-vs-knicks.mp4
```

## Variations

| Variation | Change                                       |
| --------- | -------------------------------------------- |
| Tennis    | Add `Set Score` text (e.g., "6-3, 4-6, 7-5") |
| Soccer    | Add `Yellow Cards`, `Red Cards` sliders      |
| Esports   | Add `Map`, `Round` text controls             |

## Next steps

- [Retries and timeouts](/swarm/guides/retries-and-timeouts) — live sports need reliability
- [Preview](/swarm/guides/preview) — quick visual check
- [Naming patterns](/swarm/reference/naming-patterns) — vs format
