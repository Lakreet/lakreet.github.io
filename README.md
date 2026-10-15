# Lakreet Documentation Site

Documentation hub for Lakreet projects, built with [VitePress](https://vitepress.dev/).

## Live Site

**https://lakreet.github.io/**

## Projects Documented

- **[lakreet-swarm](/swarm/)** — Batch render videos from EffectCraft templates + CSV/JSON

## Local Development

```bash
# Install dependencies
bun install

# Start dev server (http://localhost:5173)
bun run docs:dev

# Build for production
bun run docs:build

# Preview production build
bun run docs:preview

# Run all checks (build + validation)
bun run check

# Format code
bun run format
```

## Project Structure

```
docs-site/
├── docs/                    # VitePress source
│   ├── .vitepress/
│   │   ├── config.mts       # Site config (nav, sidebar, theme)
│   │   ├── theme/           # Custom theme & components
│   │   │   ├── index.ts
│   │   │   ├── custom.css   # Design tokens → VP variables
│   │   │   └── components/  # Vue components
│   ├── swarm/               # lakreet-swarm documentation
│   │   ├── learn/           # Tutorials
│   │   ├── guides/          # How-to guides
│   │   ├── reference/       # CLI reference, config, errors
│   │   ├── concepts/        # Explanations
│   │   ├── recipes/         # Real-world examples
│   │   └── tools/           # CSV generator
│   ├── plugins/             # Plugin index
│   ├── community/           # Contributing, CoC, support
│   └── about/               # About Lakreet
├── internal/                # Internal docs (not published)
│   ├── DESIGN.md            # Design tokens
│   ├── STYLE.md             # Writing style guide
│   ├── SITEMAP.md           # Page specifications
│   └── facts/               # Real CLI output for verification
├── scripts/
│   ├── check-docs.mjs       # Validation script
│   └── capture-facts.ps1    # Capture CLI facts
├── .github/workflows/
│   ├── ci.yml               # PR checks
│   └── deploy-docs.yml      # GitHub Pages deploy
├── .opencode/               # OpenCode agent config
│   ├── skills/lakreet-design/
│   └── commands/
├── AGENTS.md                # Agent rules
├── opencode.json            # OpenCode config
└── package.json
```

## Adding Content

1. Follow the [Writing Guide](internal/STYLE.md)
2. Use the [Design Tokens](internal/DESIGN.md)
3. Reference real CLI output from `internal/facts/`
4. Run `bun run check` before committing

## Auto-generated Reference Pages

Reference pages under `docs/swarm/reference/cli/`, `errors.md`, `exit-codes.md`, `compatibility.md`, `changelog.md` are generated from the [lakreet-swarm](https://github.com/Lakreet/lakreet-swarm) source code:

```bash
# In lakreet-swarm repo
node scripts/gen-docs.js ../documentation/docs-site/docs/swarm/reference
```

## Deployment

Automatic via GitHub Actions on push to `main`:

- `.github/workflows/ci.yml` — Runs `bun run check` on PRs
- `.github/workflows/deploy-docs.yml` — Deploys to GitHub Pages

## License

MIT License — see individual project repos for details.

## Contact

- **GitHub:** [Lakreet organization](https://github.com/Lakreet)
- **Issues:** [lakreet-swarm issues](https://github.com/Lakreet/lakreet-swarm/issues)
- **Discussions:** [GitHub Discussions](https://github.com/orgs/Lakreet/discussions)
