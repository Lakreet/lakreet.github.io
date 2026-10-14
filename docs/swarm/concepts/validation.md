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
Data file -> Parse -> Map columns -> Coerce types -> Check media -> All errors or valid rows
```

Every step runs for **all rows** before any render.

## Error reporting

Errors include **exact location**:

```
Found 3 problem(s) in data.csv:
- Line 5, column "Opacity": "abc" is not a number.
- Line 8, column "Source Text": column "Source Text" is required.
- Line 12, column "Logo": file not found: /assets/missing.png
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

## Media validation

Media columns validated as file paths:

- Relative paths resolved against data file folder or --media-dir
- Existence checked
- Warnings for suspicious paths (outside mediaDir)

## Warnings vs errors

| Level   | Example                                     | Behavior                          |
| ------- | ------------------------------------------- | --------------------------------- |
| Error   | Type mismatch, missing file                 | Blocks render, exit code 3        |
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
