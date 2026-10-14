---
description: Write or update one docs page from the sitemap
---

Write or update the docs page for this path: $ARGUMENTS

1. Find the page spec in internal/SITEMAP.md (path, type, goal, must-contain list, source of truth).
2. Read the facts in internal/facts/ and, for reference pages, the generated files under docs/swarm/reference/.
3. Write the page following internal/STYLE.md and the lakreet-design skill.
4. Run every command that appears in the page and make sure the output shown is real.
5. Run `bun run check` and fix any problem.
6. Report: what you wrote, which commands you ran, and anything you could not verify.

Do not invent flags, output or versions. Do not commit.