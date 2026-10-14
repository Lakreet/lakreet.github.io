# Writing guide

## Voice

- English, present tense, second person ("you").
- Short sentences. One idea per paragraph.
- Say what happens, not what "might" happen. If you are not sure, verify or leave it out.

## Page types (Diataxis)

- **Tutorial** (`learn/`): learning by doing. Steps always work. Show the result after each step. No theory.
- **How-to** (`guides/`): one goal. Sections: Before you start, Steps, Result, If something goes wrong.
- **Reference** (`reference/`): neutral, complete, structured. No "how to" advice.
- **Explanation** (`concepts/`): why and how things fit together. No step lists.
- **Recipe** (`recipes/`): a worked scenario: goal, template controls, CSV, command, result, variations.

## Required frontmatter

```yaml
---
title: Page title
description: One sentence used by search and link previews.
type: tutorial | how-to | reference | explanation | recipe | tool | hub
status: stable | experimental | planned
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---
```

## Code and commands

- Always set a language on code fences (`powershell`, `bash`, `json`, `text`).
- Show shell variants with a `code-group` when they differ (PowerShell, cmd, bash).
- Output blocks are copied from real runs. Replace personal paths with `<you>`.

## Structure

- One `#` heading per page (the title). Then `##` and `###` in order.
- End with "Next steps" linking to 2 or 3 related pages.
- Use callouts sparingly: `tip`, `warning`, `danger`.

## Names

- Product names: EffectCraft, lakreet-swarm, Lakreet. Always say "unofficial" when describing the relationship to EffectCraft.
- Use the same term everywhere: template, control, values, data file, row.

## Images

- PNG, about 1600 px wide, no personal information, alt text that describes the content.
