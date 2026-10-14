---
description: Build the site and run all docs checks
---

Run `bun run check`. If it fails, fix the cause (not the check) and run it again.
Then list every page whose frontmatter `verified` version is older than the current lakreet-swarm version in internal/facts/version.txt.
Report the result in five lines or fewer. Do not commit.