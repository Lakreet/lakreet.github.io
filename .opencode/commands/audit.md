---
description: Audit docs for mixed page types and unverified claims
---

Audit the docs under docs/swarm/ and report findings only (do not edit files):
1. Pages that mix Diataxis types (steps inside reference, explanation inside how-to, and so on).
2. Any command, flag, option, error code or output that does not appear in internal/facts/ or the generated reference.
3. Features described as available that are `planned` (for example media replacement).
4. Pages without "Next steps", without frontmatter, or with placeholders left.
5. Broken or missing cross-links between related pages.
Group findings by severity (high, medium, low) and cite the file and heading for each.