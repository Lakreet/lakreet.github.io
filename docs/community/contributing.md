---
title: Contributing
description: How to contribute to Lakreet projects.
type: reference
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Contributing

Thank you for contributing to Lakreet!

## Ways to contribute

- **Bug reports** — include `lakreet-swarm doctor` output
- **Feature requests** — check [Roadmap](/swarm/concepts/roadmap) first
- **Documentation** — fix typos, add examples, translate
- **Code** — PRs welcome, follow style guide
- **Testing** — run `npm run smoke` on new EffectCraft versions

## Development setup

```bash
# Lakreet-swarm
git clone https://github.com/Lakreet/lakreet-swarm.git
cd lakreet-swarm
npm install
npm run checkall  # format, lint, test, smoke
```

## Code style

- TypeScript (strict), ESLint + Prettier
- `npm run format` before commit
- No shell execution (array args only)
- Tests for new features

## Pull request process

1. Fork & branch
2. Make changes
3. `npm run checkall` passes
4. Update docs if needed
5. Open PR with description

## Issue templates

- **Bug**: include `doctor` output, steps to reproduce
- **Feature**: use case, alternatives considered
- **Docs**: page URL, what's wrong/missing

## Community

- GitHub Discussions for questions
- GitHub Issues for bugs/features
- Be respectful — see [Code of Conduct](/community/code-of-conduct)

## Next steps

- [Code of Conduct](/community/code-of-conduct)
- [Security](/community/security) — vulnerability reporting
- [Support](/community/support) — where to get help
