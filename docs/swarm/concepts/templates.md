---
title: Templates
description: Anatomy of .ectemplate (ZIP with manifest.json, project.ecproj, poster.png); controls; warning that template contains full project.
type: explanation
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Templates

An `.ectemplate` file is a **ZIP archive** (stored, not compressed) containing a complete EffectCraft project plus a manifest.

## Structure

```
my-template.ectemplate (ZIP)
├── manifest.json      # Controls, media, composition info (version 1)
├── project.ecproj     # Full EffectCraft project (binary)
└── poster.png         # Thumbnail (1920×1080 typical)
```

![Dark panel with three vertical strips showing the files inside an .ectemplate archive: manifest.json (controls and composition info), project.ecproj (the entire EffectCraft project) and poster.png (the thumbnail preview).](/img/concepts/ectemplate-anatomy.svg)

## manifest.json

The manifest is what lakreet-swarm reads to discover controls and media.

```json
{
  "version": 1,
  "format": "effectcraft-template",
  "name": "Comp 1",
  "width": 1920,
  "height": 1080,
  "duration": 10.01,
  "frameRate": 29.97,
  "controls": [
    { "name": "Source Text", "type": "text", "value": "Your Name" },
    { "name": "Opacity", "type": "slider", "value": 100 }
  ],
  "media": [{ "name": "Logo", "item": "logo.png", "files": ["logo.png"] }]
}
```

### Key fields

| Field        | Description                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| `version`    | Manifest version (currently 1). lakreet-swarm warns if different.                 |
| `format`     | Must be `"effectcraft-template"`.                                                 |
| `controls[]` | Array of Essential Graphics controls. Each has `name`, `type`, `value` (default). |
| `media[]`    | Media placeholders. Each has `name`, `item`, `files[]`.                           |

## Controls

Controls come from **Essential Graphics** panel in EffectCraft. Only properties added there appear in the manifest.

### Supported types

| Type     | EffectCraft property               | Manifest `type` | Input validation         |
| -------- | ---------------------------------- | --------------- | ------------------------ |
| Text     | Source Text                        | `text`          | Any string               |
| Slider   | Opacity, Position, Scale, Rotation | `slider`        | Finite number            |
| Checkbox | Checkbox Control                   | `checkbox`      | Boolean (many spellings) |

### Unknown types

If EffectCraft adds new control types, lakreet-swarm falls back to `text` so renders don't hard-fail. Check `inspect --json` for the raw type.

## Media

Media entries in the manifest represent footage/images used in the template.

Media replacement is **not supported yet**. A data column that maps to a media control stops `check` and `render` before rendering with error `E_MEDIA_UNSUPPORTED` (exit code 3). A media control with no data column keeps the template's default media.

EffectCraft's `--values` cannot replace media. EffectCraft's `essential.set` engine command (reachable through `effectcraft-cli exec`) accepts a media `item`, but lakreet-swarm does not use it. Whether a per-row pipeline (load the template into a project, set the media item, render the project) is feasible and fast enough has not been evaluated. Status: planned, not scheduled. See [Media guide](/swarm/guides/media).

## poster.png

A PNG thumbnail of the composition. Used by the [CSV generator](/swarm/tools/csv-generator) and preview gallery.

## Warning: Template contains full project

The `.ectemplate` includes `project.ecproj` — the **entire EffectCraft project** (all layers, effects, expressions, footage references). This means:

- File sizes can be large (MB to tens of MB)
- Anyone with the template can open it in EffectCraft and see the full project
- Don't include sensitive assets in templates you share

## Version compatibility

EffectCraft evolves quickly. lakreet-swarm tracks tested versions in `compat.json` and warns via `doctor` if your EffectCraft version isn't listed.

```bash
lakreet-swarm doctor
# [FAIL] EffectCraft version — 0.9.0 — not in compat.json (tested: 0.8.0)
```

## Next steps

- [Make a template](/swarm/learn/make-a-template) — hands-on tutorial
- [How it works](/swarm/concepts/how-it-works) — render pipeline
- [Control types reference](/swarm/reference/control-types) — input formats & errors
