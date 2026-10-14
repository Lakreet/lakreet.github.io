---
title: Row selection
description: Syntax for --only (1,3,5-8) and --limit N.
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Row selection

Filter which rows to render using `--only` and `--limit`.

## --only syntax

Comma-separated list of row numbers (1-based) and/or ranges:

```bash
--only 1,3,5-8,10
```

### Grammar

```
selection := item ("," item)*
item := number | range
range := number "-" number
number := [1-9][0-9]*
```

### Examples

| Spec        | Rows selected            |
| ----------- | ------------------------ |
| `5`         | Row 5 only               |
| `1,3,5`     | Rows 1, 3, 5             |
| `5-10`      | Rows 5, 6, 7, 8, 9, 10   |
| `1,3,5-8`   | Rows 1, 3, 5, 6, 7, 8    |
| `1-3,5,7-9` | Rows 1, 2, 3, 5, 7, 8, 9 |

### Validation rules

- Numbers must be ≥ 1
- Range start ≤ end
- Duplicates auto-removed (set semantics)
- Out-of-range rows silently ignored (no error)

## --limit syntax

```bash
--limit N
```

- `N` = positive integer
- Processes first N rows **after** `--only` filter
- `--limit 0` = no rows

### Combined with --only

```bash
# Rows 5-10, but only first 3 of those
--only 5-10 --limit 3
# Result: rows 5, 6, 7
```

## Programmatic use

Selection logic is in `src/selection.js`:

```javascript
import { parseOnly, selectRows } from "lakreet-swarm/selection";

const selected = parseOnly("1,3,5-8"); // Set {1, 3, 5, 6, 7, 8}
const filtered = selectRows(rows, { only: "1,3,5-8", limit: 2 });
```

## Next steps

- [Resume a batch](/swarm/guides/resume-batches) — --only, --skip-existing
- [Retries and timeouts](/swarm/guides/retries-and-timeouts) — --limit for testing
- [CLI render reference](/swarm/reference/cli/render) — all flags
