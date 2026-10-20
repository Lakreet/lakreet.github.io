// One-off: embed the self-hosted OFL fonts (base64 data URIs) into the
// concept diagrams so they render correctly even when loaded via <img>.
// Run: bun scripts/embed-svg-fonts.mjs
import { readFileSync, writeFileSync } from "node:fs";

const b64 = (p) => readFileSync(p).toString("base64");
const fonts = {
  "%%OSWALD%%": b64("docs/public/fonts/oswald-500.woff2"),
  "%%MONO%%": b64("docs/public/fonts/jetbrains-mono-600.woff2"),
};

const files = [
  "docs/public/img/concepts/flow-template-data-video.svg",
  "docs/public/img/concepts/ectemplate-anatomy.svg",
  "docs/public/img/concepts/batch-flow.svg",
];

for (const file of files) {
  let svg = readFileSync(file, "utf8");
  for (const [placeholder, data] of Object.entries(fonts)) {
    svg = svg.split(placeholder).join(data);
  }
  if (svg.includes("%%")) {
    console.error(`UNSUITABLE: placeholder left in ${file}`);
    process.exitCode = 1;
    continue;
  }
  writeFileSync(file, svg);
  console.log(`embedded fonts: ${file}`);
}
