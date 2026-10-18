---
title: Security
description: No shell execution, trust model for input data, CSV generator privacy.
type: explanation
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Security

lakreet-swarm is designed with security as a default, not an afterthought.

## No shell execution

- All CLI arguments passed as arrays to spawn/execFile
- No shell: true, no string interpolation
- ESLint rule no-shell-string enforced in CI
- Command injection impossible via flags or data

```javascript
// Safe: array args
execFile(cliPath, ['render', '--template', tpl, '--values', vals], ...)

// Unsafe (never used):
execFile('sh', ['-c', `render --template ${tpl}`], ...)
```

## Trust model

| Component              | Trust level     | Reason                                                                                               |
| ---------------------- | --------------- | ---------------------------------------------------------------------------------------------------- |
| Template (.ectemplate) | Trusted         | Contains full EffectCraft project; only run templates you trust                                      |
| Data file (CSV/JSON)   | Untrusted input | Validated, coerced, sanitized before use                                                             |
| Media files            | Not processed   | Media replacement is not supported; a media control without a data column keeps the template default |
| EffectCraft CLI        | Trusted         | Local binary, same trust as any installed app                                                        |

## Data validation as security

- Every row validated before render
- Type coercion with strict rules (no silent corruption)
- A data column that maps to a media control is rejected before render
- Output names sanitized (Windows reserved names, invalid chars)

## CSV generator privacy

The in-browser CSV generator:

- Runs entirely in browser (no server)
- No localStorage, sessionStorage, IndexedDB
- No analytics, no tracking, no external requests
- Only network request: optional fetch of example template from same origin
- File processing: client-side ZIP read (fflate), no upload

## EffectCraft trust boundary

User -> lakreet-swarm (validates) -> effectcraft-cli (trusted local binary) -> OS

lakreet-swarm never:

- Executes shell commands
- Evaluates code from data
- Accesses files outside declared paths
- Sends data to network

## Next steps

- [How it works](/swarm/concepts/how-it-works) — pipeline
- [CSV generator](/swarm/tools/csv-generator) — privacy details
- [Install](/swarm/guides/install) — verifying EffectCraft
