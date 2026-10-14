---
title: Security
description: Security policy and how to report vulnerabilities.
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Security

## Reporting vulnerabilities

**Do not** open public issues for security vulnerabilities.

Email: **security@lakreet.dev**

Include:

- Description of vulnerability
- Steps to reproduce
- Impact assessment
- Suggested fix (if any)

We aim to respond within 72 hours.

## Security features

- No shell execution (array args only)
- Input validation on all data
- Path traversal protection (mediaDir base)
- No external network calls (except EffectCraft CLI)
- No analytics, no tracking

## Supported versions

| Version | Supported |
| ------- | --------- |
| 0.2.x   | Yes       |
| < 0.2   | No        |

Upgrade to latest for security fixes.

## Next steps

- [Contributing](/community/contributing)
- [Code of Conduct](/community/code-of-conduct)
- [Support](/community/support)
