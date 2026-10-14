---
title: Control types
description: "Supported types (text, slider, checkbox) with input formats, examples, and error messages. Planned: color, point, media."
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Control types

Controls come from Essential Graphics in EffectCraft. lakreet-swarm supports three types natively.

## Supported types

### text

**EffectCraft property:** Source Text

| Input   | Result | Notes                      |
| ------- | ------ | -------------------------- |
| "Hello" | Hello  | Any string                 |
| ""      | ""     | Empty string               |
| 123     | 123    | Numbers coerced to string  |
| true    | true   | Booleans coerced to string |

**Validation:** Always passes. Empty allowed.

**Error message:** None (fallback for unknown types).

### slider

**EffectCraft properties:** Opacity, Position, Scale, Rotation, etc.

| Input | Result        | Notes            |
| ----- | ------------- | ---------------- |
| 100   | 100 (number)  | Integer          |
| 75.5  | 75.5 (number) | Float            |
| -10   | -10           | Negative allowed |
| "100" | 100 (number)  | String coerced   |

**Validation errors:**

| Input      | Error                        |
| ---------- | ---------------------------- |
| "" (empty) | empty value is not a number. |
| "abc"      | "abc" is not a number.       |
| null       | empty value is not a number. |
| Infinity   | Infinity is not a number.    |

### checkbox

**EffectCraft property:** Checkbox Control

| Input   | Result | Notes            |
| ------- | ------ | ---------------- |
| true    | true   | Boolean          |
| false   | false  | Boolean          |
| "true"  | true   | Case-insensitive |
| "yes"   | true   |                  |
| "y"     | true   |                  |
| "1"     | true   |                  |
| "on"    | true   |                  |
| "ya"    | true   | Indonesian       |
| "false" | false  |                  |
| "no"    | false  |                  |
| "n"     | false  |                  |
| "0"     | false  |                  |
| "off"   | false  |                  |
| "tidak" | false  | Indonesian       |

**Validation errors:**

| Input   | Error                     |
| ------- | ------------------------- |
| "maybe" | "maybe" is not a boolean. |
| ""      | "" is not a boolean.      |
| 123     | 123 is not a boolean.     |

## Unknown types (fallback)

If EffectCraft adds new control types, lakreet-swarm treats them as text:

- No hard failure
- Value passed as string
- Warning logged in check/inspect

## Planned (not yet supported)

| Type  | EffectCraft property     | Status                           |
| ----- | ------------------------ | -------------------------------- |
| color | Color Control            | Planned                          |
| point | Point Control (Position) | Planned                          |
| media | Footage/Image layer      | Planned (requires pipeline mode) |

## Next steps

- [Data formats](/swarm/reference/data-formats) — input per type
- [Make a template](/swarm/learn/make-a-template) — adding controls in EffectCraft
- [Validate first](/swarm/guides/validate-first) — catch type errors
