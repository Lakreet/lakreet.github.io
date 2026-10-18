---
title: Validation
description: Why all rows are validated before rendering; error reporting model with line numbers.
type: explanation
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Validation

lakreet-swarm validates **every row** before rendering a single frame. This is a deliberate design choice.

## Why validate first?

| Benefit          | Explanation                                                          |
| ---------------- | -------------------------------------------------------------------- |
| Fail fast        | Catch all errors in 1 second vs discovering at row 500 after 2 hours |
| Complete picture | See all problems at once, fix in one edit                            |
| No partial waste | Don't burn CPU/GPU on rows that will fail                            |
| CI friendly      | `check` exits with code 3, no render cost                            |

## Validation model

```
Data file -> Parse -> Map columns -> Coerce types -> Check media controls -> All errors or valid rows
```

Every step runs for **all rows** before any render.

## Error reporting

Errors include **exact location**:

```
Found 2 problem(s) in data.csv:
- Line 5, column "Opacity": "abc" is not a number.
- Line 8, column "Source Text": column "Source Text" is required.
```

A column that maps to a media control stops validation before any problem list:

```
Column "Logo" maps to a media control; media replacement is not supported yet.
  Hint: Use text, number or checkbox controls for now, or remove the column.
```

- Line numbers: 1-based, header = line 1 (CSV) or item number (JSON/JSONL)
- Column names: Original header (before mapping) or JSON key
- All at once: No "fix one, re-run, find next" loop

## Type coercion

| Input type | Control type | Coercion           | Validation            |
| ---------- | ------------ | ------------------ | --------------------- |
| string     | text         | pass through       | always ok             |
| number     | slider       | pass through       | finite check          |
| string     | slider       | parse float        | NaN/Infinity rejected |
| boolean    | checkbox     | pass through       | exact match           |
| string     | checkbox     | parse truthy/falsy | known words only      |

Unknown types -> fallback to text (no hard failure).

## Media controls

Media replacement is not supported yet. A data column that maps to a media control stops `check` and `render` before rendering with error `E_MEDIA_UNSUPPORTED` (exit code 3). A media control with no data column keeps the template's default media.

## Warnings vs errors

| Level   | Example                                     | Behavior                          |
| ------- | ------------------------------------------- | --------------------------------- |
| Error   | Type mismatch, unsupported media control    | Blocks render, exit code 3        |
| Warning | Unknown manifest version, deprecated column | Logged to stderr, render proceeds |

## Programmatic API

```javascript
import { readRows } from "lakreet-swarm/data";

const { rows, problems, warnings } = readRows("data.csv", controls, options);

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(3);
}
```

## Next steps

- [Validate first](/swarm/guides/validate-first) — how-to
- [Control types](/swarm/reference/control-types) — per-type validation
- [Data formats](/swarm/reference/data-formats) — CSV/JSON/JSONL rules
