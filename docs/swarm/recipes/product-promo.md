---
title: Product promo
description: Promo product videos with name, price (text), opacity controls.
type: recipe
status: stable
since: 0.2.0
verified:
  swarm: 0.2.0
  effectcraft: 0.8.0
---

# Product promo

Create product promotion videos from a product catalog.

## Template controls

| Control name | Type   | Description                          |
| ------------ | ------ | ------------------------------------ |
| Product Name | text   | Product title                        |
| Price        | text   | Formatted price (e.g., "Rp 199.000") |
| Opacity      | slider | Background opacity                   |

## CSV example

```csv
Product Name,Price,Opacity
"Wireless Headphones","Rp 799.000",80
"Mechanical Keyboard","Rp 1.299.000",90
"USB-C Hub","Rp 349.000",70
```

## Command

```bash
lakreet-swarm render \
  --template product-promo.ectemplate \
  --data products.csv \
  --name "{index:3}-{slug:Product Name}"
```

## Output

```
out/001-wireless-headphones.mp4
out/002-mechanical-keyboard.mp4
out/003-usb-c-hub.mp4
```

## Variations

| Variation      | Change                                                 |
| -------------- | ------------------------------------------------------ |
| Sale           | Add `Original Price` text, `Discount %` slider         |
| Multi-language | Add `Language` column, map to templates                |
| Social sizes   | See [Social sizes recipe](/swarm/recipes/social-sizes) |

## Next steps

- [Choose output](/swarm/guides/choose-output) — format, quality
- [Map columns](/swarm/guides/map-columns) — CSV header mapping
- [Naming patterns](/swarm/reference/naming-patterns) — slugified names
