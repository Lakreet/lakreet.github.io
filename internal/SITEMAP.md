# Lakreet Documentation Sitemap

This file documents the complete site structure for the Lakreet documentation hub.

## Site Structure

```
/                                  Beranda hub
/plugins/                          Indeks plugin (kartu, pencarian, filter)
/swarm/                            Ringkasan lakreet-swarm
  /swarm/learn/                    TUTORIAL (belajar sambil mengerjakan)
    first-batch
    make-a-template
    personalized-videos
  /swarm/guides/                   HOW-TO (menyelesaikan satu tugas)
    install
    data-csv
    data-json
    map-columns
    validate-first
    preview
    resume-batches
    retries-and-timeouts
    choose-output
    use-in-ci
    troubleshoot
    media                          (status: planned)
  /swarm/reference/                REFERENSI (dicari, bukan dibaca)
    cli/                           index + render, check, inspect, init, preview, doctor
    config
    data-formats
    control-types
    naming-patterns
    selection
    exit-codes
    errors                         (dihasilkan otomatis)
    report-schema
    environment
    compatibility                  (dihasilkan otomatis)
    changelog
  /swarm/concepts/                 EXPLANATION (memahami "mengapa")
    how-it-works
    templates
    validation
    performance
    security
    limitations
    unofficial
    roadmap
  /swarm/recipes/                  Contoh skenario nyata
    greeting-videos
    product-promo
    certificates
    scoreboard
    lower-thirds
    social-sizes
  /swarm/tools/
    csv-generator                  Generator CSV di browser
    command-builder                (opsional)
/community/                        contributing, code-of-conduct, support, security
/about/                            Tentang Lakreet dan pernyataan tidak resmi
```

## Navigation Rules

- Top bar: **Home, Plugins, Docs (menu per plugin), Community, GitHub**.
- Inside `/swarm/`, sidebar divided into six groups matching folders: Learn, Guides, Reference, Concepts, Recipes, Tools.
- Every page has "On this page" on the right, "Edit this page" link to GitHub, and "Next steps" at the end.
- URLs use lowercase and hyphens; no extensions (`cleanUrls`).

## Page Specifications

### Hub Pages

| Path        | Type | Status | Goal                                                                        |
| ----------- | ---- | ------ | --------------------------------------------------------------------------- |
| `/`         | hub  | stable | In 10 seconds visitor understands: one template + data produces many videos |
| `/plugins/` | hub  | stable | Discover plugins                                                            |
| `/swarm/`   | hub  | stable | One-page plugin summary                                                     |

### Learn (Tutorial)

| Path                               | Type     | Status | Goal                                               |
| ---------------------------------- | -------- | ------ | -------------------------------------------------- |
| `/swarm/learn/first-batch`         | tutorial | stable | 5 videos in ≤10 min using template and example CSV |
| `/swarm/learn/make-a-template`     | tutorial | stable | Create own template in EffectCraft                 |
| `/swarm/learn/personalized-videos` | tutorial | stable | Complete project with 20 rows of real data         |

### Guides (How-to)

| Path                                 | Type   | Status  | Goal                                        |
| ------------------------------------ | ------ | ------- | ------------------------------------------- |
| `/swarm/guides/install`              | how-to | stable  | Install and verify readiness                |
| `/swarm/guides/data-csv`             | how-to | stable  | Prepare correct CSV                         |
| `/swarm/guides/data-json`            | how-to | stable  | Use JSON or JSONL                           |
| `/swarm/guides/map-columns`          | how-to | stable  | Map columns to controls                     |
| `/swarm/guides/validate-first`       | how-to | stable  | Catch problems before render                |
| `/swarm/guides/preview`              | how-to | stable  | Check appearance early                      |
| `/swarm/guides/resume-batches`       | how-to | stable  | Continue interrupted batch                  |
| `/swarm/guides/retries-and-timeouts` | how-to | stable  | Handle failed/hanging renders               |
| `/swarm/guides/choose-output`        | how-to | stable  | Choose format and naming                    |
| `/swarm/guides/use-in-ci`            | how-to | stable  | Use in scripts or CI                        |
| `/swarm/guides/troubleshoot`         | how-to | stable  | Symptoms, causes, fixes                     |
| `/swarm/guides/media`                | how-to | planned | Explain media replacement not yet available |

### Reference

| Path                               | Type      | Status | Generated |
| ---------------------------------- | --------- | ------ | --------- |
| `/swarm/reference/cli/`            | reference | stable | yes       |
| `/swarm/reference/cli/render`      | reference | stable | yes       |
| `/swarm/reference/cli/check`       | reference | stable | yes       |
| `/swarm/reference/cli/inspect`     | reference | stable | yes       |
| `/swarm/reference/cli/init`        | reference | stable | yes       |
| `/swarm/reference/cli/preview`     | reference | stable | yes       |
| `/swarm/reference/cli/doctor`      | reference | stable | yes       |
| `/swarm/reference/config`          | reference | stable | no        |
| `/swarm/reference/data-formats`    | reference | stable | no        |
| `/swarm/reference/control-types`   | reference | stable | no        |
| `/swarm/reference/naming-patterns` | reference | stable | no        |
| `/swarm/reference/selection`       | reference | stable | no        |
| `/swarm/reference/exit-codes`      | reference | stable | yes       |
| `/swarm/reference/errors`          | reference | stable | yes       |
| `/swarm/reference/report-schema`   | reference | stable | no        |
| `/swarm/reference/environment`     | reference | stable | no        |
| `/swarm/reference/compatibility`   | reference | stable | yes       |
| `/swarm/reference/changelog`       | reference | stable | yes       |

### Concepts (Explanation)

| Path                           | Type        | Status |
| ------------------------------ | ----------- | ------ |
| `/swarm/concepts/how-it-works` | explanation | stable |
| `/swarm/concepts/templates`    | explanation | stable |
| `/swarm/concepts/validation`   | explanation | stable |
| `/swarm/concepts/performance`  | explanation | stable |
| `/swarm/concepts/security`     | explanation | stable |
| `/swarm/concepts/limitations`  | explanation | stable |
| `/swarm/concepts/unofficial`   | explanation | stable |
| `/swarm/concepts/roadmap`      | explanation | stable |

### Recipes

| Path                             | Type   | Status |
| -------------------------------- | ------ | ------ |
| `/swarm/recipes/greeting-videos` | recipe | stable |
| `/swarm/recipes/product-promo`   | recipe | stable |
| `/swarm/recipes/certificates`    | recipe | stable |
| `/swarm/recipes/scoreboard`      | recipe | stable |
| `/swarm/recipes/lower-thirds`    | recipe | stable |
| `/swarm/recipes/social-sizes`    | recipe | stable |

### Tools

| Path                           | Type | Status       |
| ------------------------------ | ---- | ------------ |
| `/swarm/tools/csv-generator`   | tool | stable       |
| `/swarm/tools/command-builder` | tool | experimental |

### Community & About

| Path                         | Type      | Status |
| ---------------------------- | --------- | ------ |
| `/community/contributing`    | reference | stable |
| `/community/code-of-conduct` | reference | stable |
| `/community/support`         | reference | stable |
| `/community/security`        | reference | stable |
| `/about/`                    | hub       | stable |
