#!/usr/bin/env node
// fetch-fonts.mjs - Download open-licensed webfonts (SIL OFL) into docs/public/fonts.
// Families: Oswald (condensed display), Inter (body), JetBrains Mono (code).
// Run once; commit the resulting .woff2 files. Plain Node/Bun, no dependencies.

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const outDir = join(__dirname, "..", "docs", "public", "fonts");

// Browser-like UA so Google Fonts serves woff2 (modern format).
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

/** Latin unicode-range signature used by Google's latin subset blocks. */
const LATIN_RANGE = "U+0000-00FF";

const families = [
  { slug: "oswald", css: "Oswald", weights: [400, 500, 600, 700] },
  { slug: "inter", css: "Inter", weights: [400, 500, 700] },
  { slug: "jetbrains-mono", css: "JetBrains Mono", weights: [400, 600] },
];

function unescapePath(u) {
  return u.replace(/\\(\d{2,4})/g, (_, code) =>
    String.fromCharCode(Number.parseInt(code, 8)),
  );
}

async function fetchWoff2Url(family, weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  ).replace(/%20/g, "+")}:wght@${weight}`;
  const res = await fetch(cssUrl, {
    headers: { "User-Agent": UA },
  });
  if (!res.ok) {
    throw new Error(`css2 ${family} ${weight}: HTTP ${res.status}`);
  }
  const css = await res.text();
  // One @font-face block per unicode subset; keep the latin one only.
  const blocks = css.split("@font-face").slice(1);
  for (const block of blocks) {
    if (!block.includes(LATIN_RANGE)) continue;
    const urlMatch = block.match(/url\((https:[^)]+\.woff2)\)/);
    if (!urlMatch) {
      throw new Error(`no woff2 URL found for ${family} ${weight} (latin)`);
    }
    return unescapePath(urlMatch[1]);
  }
  throw new Error(`no latin subset block for ${family} ${weight}`);
}

mkdirSync(outDir, { recursive: true });

let failures = 0;
for (const fam of families) {
  for (const w of fam.weights) {
    const dest = join(outDir, `${fam.slug}-${w}.woff2`);
    if (existsSync(dest)) {
      console.log(`skip  ${fam.slug}-${w}.woff2 (exists)`);
      continue;
    }
    try {
      const url = await fetchWoff2Url(fam.css, w);
      const bin = await fetch(url);
      if (!bin.ok) throw new Error(`HTTP ${bin.status}`);
      const buf = Buffer.from(await bin.arrayBuffer());
      if (buf.length < 4096) throw new Error("download too small, suspicious");
      writeFileSync(dest, buf);
      console.log(`saved ${fam.slug}-${w}.woff2 (${buf.length} bytes)`);
    } catch (err) {
      failures += 1;
      console.error(`FAIL  ${fam.slug}-${w}.woff2: ${err.message}`);
    }
  }
}

if (failures > 0) {
  console.error(
    `\n${failures} file(s) failed. Font URLs change rarely; retry later.`,
  );
  process.exit(1);
}
console.log(`\nFonts written to ${outDir}`);
