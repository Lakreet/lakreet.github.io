<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

interface Plugin {
  id: string;
  name: string;
  tagline: string;
  status: string;
  version: string;
  repo: string;
  docs: string;
  tags: string[];
  category: string;
}

interface Compat {
  testedEffectCraft: string[];
  testedNode: string[];
  testedOS: string[];
  notes: string;
}

// -------------------------------------------------------------------------
// Data from the registries served from this site (docs/public/data).
// Adding an entry to plugins.json or compat.json updates this page.
// -------------------------------------------------------------------------
const plugins = ref<Plugin[]>([]);
const compat = ref<Compat | null>(null);
const failed = ref(false);

function loadJson<T>(url: string, target: { value: T | null }) {
  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then((data) => {
      target.value = data;
    })
    .catch(() => {
      failed.value = true;
    });
}

onMounted(() => {
  loadJson<Plugin[]>("/data/plugins.json", plugins);
  loadJson<Compat>("/data/compat.json", compat);
});

const pluginList = computed(() =>
  plugins.value.map((p) => ({
    ...p,
    statusLabel: p.status.charAt(0).toUpperCase() + p.status.slice(1),
  })),
);

// -------------------------------------------------------------------------
// Install terminal (npm.ts shared, real commands from facts)
// -------------------------------------------------------------------------
const terminalTabs = [
  { id: "npm", label: "npm", command: "npm install -g lakreet-swarm" },
  { id: "npx", label: "npx", command: "npx lakreet-swarm --help" },
];
const terminalTab = ref("npm");
const terminalCommand = computed(
  () => terminalTabs.find((t) => t.id === terminalTab.value)?.command ?? "",
);

const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;
async function copyCommand() {
  try {
    await navigator.clipboard.writeText(terminalCommand.value);
    copied.value = true;
    clearTimeout(copiedTimer);
    copiedTimer = setTimeout(() => {
      copied.value = false;
    }, 1600);
  } catch {
    // Clipboard unavailable (permissions). Keep quiet; the text is selectable.
  }
}

// -------------------------------------------------------------------------
// Scroll reveal (subtle fade-up, disabled for reduced motion)
// -------------------------------------------------------------------------
const revealEls = ref<HTMLElement[]>([]);
let observer: IntersectionObserver | undefined;

// Template anchor
const root = ref<HTMLElement | null>(null);

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) return;
  const els = root.value?.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!els) return;
  els.forEach((el) => revealEls.value.push(el));
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1 },
  );
  revealEls.value.forEach((el) => observer?.observe(el));
});

onBeforeUnmount(() => {
  observer?.disconnect();
  clearTimeout(copiedTimer);
});

const steps = [
  {
    no: "#1",
    kicker: "TEMPLATE",
    title: "Design once in EffectCraft",
    body: "Mark the parts that change — source text, opacity — as Essential Graphics controls, then export the composition as a .ectemplate file.",
    link: { text: "Make a template", href: "/swarm/learn/make-a-template" },
  },
  {
    no: "#2",
    kicker: "DATA",
    title: "Prepare one data file",
    body: "Write a CSV, JSON or JSONL file where every column name matches a control. Each row is one video, nothing more to build.",
    link: { text: "Prepare a CSV", href: "/swarm/guides/data-csv" },
  },
  {
    no: "#3",
    kicker: "VIDEO",
    title: "Render every row",
    body: "One command renders the whole batch, catches problems first with check, and writes a report after every run.",
    link: { text: "Your first batch", href: "/swarm/learn/first-batch" },
  },
];

const features = [
  {
    kicker: "#1 VALIDATE FIRST",
    title: "Check before render",
    body: "Every row is validated before anything renders, with the exact line and column of each problem.",
    href: "/swarm/guides/validate-first",
  },
  {
    kicker: "#2 RESUME",
    title: "Resume any batch",
    body: "Interrupted? Pick rows with --only, skip finished videos with --skip-existing and continue where you stopped.",
    href: "/swarm/guides/resume-batches",
  },
  {
    kicker: "#3 PREVIEW",
    title: "One frame per row",
    body: "Render a single frame per data row into an HTML gallery and review the whole batch in seconds.",
    href: "/swarm/guides/preview",
  },
  {
    kicker: "#4 REPORTS",
    title: "Reports and events",
    body: "Every batch writes report.json and report.csv, and streams NDJSON progress for scripts and pipelines.",
    href: "/swarm/guides/use-in-ci",
  },
  {
    kicker: "#5 CSV GENERATOR",
    title: "Template to CSV in your browser",
    body: "Upload a .ectemplate, get a table ready to fill, download the CSV. Everything stays in your browser.",
    href: "/swarm/tools/csv-generator",
  },
];

const osLabels: Record<string, string> = {
  win32: "Windows",
  linux: "Linux",
  darwin: "macOS",
};

const compatRows = computed(() => {
  if (!compat.value) return [];
  return [
    { label: "lakreet-swarm", value: "0.2.0" },
    { label: "EffectCraft", value: compat.value.testedEffectCraft.join(", ") },
    { label: "Node.js", value: compat.value.testedNode.join(", ") },
    {
      label: "Operating system",
      value: compat.value.testedOS.map((os) => osLabels[os] ?? os).join(", "),
    },
  ];
});
</script>

<template>
  <section ref="root" class="tpl">
    <!-- ============================= HERO ============================= -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="shell hero-grid">
        <div class="hero-copy" data-reveal>
          <p class="kicker kicker-light">
            Lakreet · Open tooling for EffectCraft
          </p>
          <h1 id="hero-title" class="display display-hero">
            Design a video<br />
            once. Render it<br />
            for every row.
          </h1>
          <p class="hero-tag">
            lakreet-swarm renders many videos from one EffectCraft template and
            a CSV or JSON file. Batch greetings, promos, certificates — with
            validation, previews and reports built in.
          </p>
          <div class="hero-actions">
            <a class="btn btn-light" href="/swarm/learn/first-batch">
              Get started
            </a>
            <a class="btn btn-outline" href="/plugins/"> Browse plugins </a>
          </div>
          <div class="hero-badges" aria-label="Status">
            <span class="chip chip-mint">Stable</span>
            <span class="chip">v0.2.0</span>
            <span class="chip">EffectCraft 0.8.0</span>
          </div>
        </div>

        <div class="hero-panel" data-reveal>
          <div class="terminal" role="group" aria-label="Install terminal">
            <div class="terminal-head">
              <span class="terminal-label">Install via terminal</span>
              <div
                class="terminal-tabs"
                role="tablist"
                aria-label="Install method"
              >
                <button
                  v-for="tab in terminalTabs"
                  :key="tab.id"
                  type="button"
                  class="terminal-tab"
                  role="tab"
                  :aria-selected="terminalTab === tab.id"
                  :class="{ 'is-active': terminalTab === tab.id }"
                  @click="terminalTab = tab.id"
                >
                  <span aria-hidden="true">:</span>{{ tab.label
                  }}<span aria-hidden="true">:</span>
                </button>
                <button
                  type="button"
                  class="terminal-copy"
                  @click="copyCommand"
                >
                  {{ copied ? "Copied" : "Copy" }}
                </button>
              </div>
            </div>
            <div class="terminal-body">
              <code data-testid="install-command">{{ terminalCommand }}</code>
            </div>
          </div>
          <div
            class="terminal"
            role="group"
            aria-label="Render pipeline terminal"
          >
            <div class="terminal-head">
              <span class="terminal-label">Then render the batch</span>
              <span class="terminal-label terminal-label-dim"
                >NDJSON output</span
              >
            </div>
            <div class="terminal-body terminal-body-tall">
              <code>
                <span class="t-dim">$</span> lakreet-swarm render --template
                title2.ectemplate --data names.csv
              </code>
              <code
                >{ "event": "row", "index": 1, "total": 5, "status": "ok"
                }</code
              >
              <code
                >{ "event": "done", "total": 5, "succeeded": 5, "failed": 0
                }</code
              >
              <code class="t-dim"
                >5 videos written to out/ · report.json saved</code
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================= HOW IT WORKS ========================= -->
    <section class="paper">
      <div class="shell">
        <h2 class="display display-section" id="how-it-works">How it works</h2>
        <div class="steps-wrap" data-reveal>
          <div class="steps">
            <article v-for="step in steps" :key="step.no" class="step">
              <p class="chip-step">{{ step.kicker }}</p>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-body">{{ step.body }}</p>
              <a class="step-link" :href="step.link.href"
                >{{ step.link.text }} →</a
              >
            </article>
          </div>
          <p class="steps-nums" aria-hidden="true">
            <span>1</span><span>2</span><span>3</span>
          </p>
          <div class="steps-strip">
            <p>5 videos written to out/ · report.json saved</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================ FEATURES =========================== -->
    <section class="paper paper-soft">
      <div class="shell">
        <h2 class="display display-section">What you get</h2>
        <ul class="feature-grid" data-reveal>
          <li v-for="feature in features" :key="feature.title">
            <a class="feature" :href="feature.href">
              <p class="kicker kicker-teal">{{ feature.kicker }}</p>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-body">{{ feature.body }}</p>
            </a>
          </li>
        </ul>
        <p v-if="failed" class="note">
          Registry data failed to load. The full index is on the
          <a href="/plugins/">plugins page</a>.
        </p>
      </div>
    </section>

    <!-- ============================ PLUGINS =========================== -->
    <section class="plate" aria-labelledby="plugins-title">
      <div class="shell" data-reveal>
        <h2 class="display display-section display-light" id="plugins-title">
          Plugins
        </h2>
        <p class="plate-tag">
          Focused tools, one plugin per problem. Each ships its own
          documentation and an open repository.
        </p>
        <div class="plugin-grid">
          <article v-for="plugin in pluginList" :key="plugin.id" class="plugin">
            <header class="plugin-head">
              <h3 class="plugin-name">{{ plugin.name }}</h3>
              <span class="plugin-status">
                {{ plugin.statusLabel }} · v{{ plugin.version }}
              </span>
            </header>
            <p class="plugin-tagline">{{ plugin.tagline }}</p>
            <ul class="plugin-tags" aria-label="Tags">
              <li v-for="tag in plugin.tags" :key="tag">{{ tag }}</li>
            </ul>
            <div class="plugin-actions">
              <a class="btn btn-light btn-compact" :href="plugin.docs">Docs</a>
              <a class="btn btn-outline btn-compact" :href="plugin.repo"
                >Repo</a
              >
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ========================= COMPATIBILITY ======================== -->
    <section class="paper" aria-labelledby="compat-title">
      <div class="shell shell-narrow" data-reveal>
        <h2 class="display display-section" id="compat-title">Compatibility</h2>
        <table class="table">
          <caption class="kicker kicker-muted">
            Tested combinations, from the plugin compatibility manifest
          </caption>
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Tested with</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in compatRows" :key="row.label">
              <td>{{ row.label }}</td>
              <td>{{ row.value }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="compat" class="note">
          {{ compat.notes }}
        </p>
        <p class="note">
          Full matrix:
          <a href="/swarm/reference/compatibility">compatibility page</a>.
        </p>
      </div>
    </section>

    <!-- ============================== CTA ============================= -->
    <section class="paper paper-soft" aria-labelledby="cta-title">
      <div class="shell shell-narrow shell-center" data-reveal>
        <p class="kicker kicker-teal">Ready to batch-render?</p>
        <h2 class="display display-section" id="cta-title">
          One template.
          <br />Every row of your data. <br />Real videos.
        </h2>
        <div class="hero-actions">
          <a class="btn btn-teal" href="/swarm/learn/first-batch">
            Get started
          </a>
          <a class="btn btn-ghost-dark" href="/swarm/guides/install">
            Install guide
          </a>
        </div>
      </div>
    </section>

    <!-- =========================== DISCLAIMER ========================= -->
    <footer class="strip">
      <p>
        Independent project. Not affiliated with the ArtCraft team or the
        EffectCraft project.
      </p>
    </footer>
  </section>
</template>

<style scoped>
/* ---------------------------------------------------------------------
   Landing tokens — mint theme, chosen by the maintainer:
   Frozen Mint #DDF8F1 (light surfaces) and Emerald Teal #008573 (plates).
   Derived tones use color-mix from these two plus ink/white only.
   Structure from the hermes-agent design system extraction; fonts
   Oswald (display), Inter (body), JetBrains Mono (mono) — all SIL OFL.
   --------------------------------------------------------------------- */
.tpl {
  --lk-teal: #008573;
  --lk-mint: #ddf8f1;
  --lk-ink: #1a1a1a;
  --lk-white: #ffffff;

  /* Deep plate: pure white reaches 5.1:1 here, so small caps text passes AA */
  --lk-teal-deep: color-mix(in srgb, var(--lk-teal) 90%, #000000);
  /* Terminal/base surface: very dark teal-ink, white/mint text ≥ 9:1 */
  --lk-teal-ink: color-mix(in srgb, var(--lk-teal) 45%, var(--lk-ink));
  /* Pressed/hover accent for teal buttons (white label stays ≥ 4.5:1) */
  --lk-teal-hover: color-mix(in srgb, var(--lk-teal) 86%, #000000);
  /* Dark teal for small text on mint paper (~7:1) */
  --lk-teal-text: color-mix(in srgb, var(--lk-teal) 62%, var(--lk-ink));
  --lk-line: color-mix(in srgb, var(--lk-teal) 28%, var(--lk-ink));
  /* Muted on mint paper, ~7:1 */
  --lk-muted-strong: color-mix(in srgb, var(--lk-teal) 35%, var(--lk-ink));

  --lk-white-70: color-mix(in srgb, var(--lk-white) 70%, var(--lk-teal-deep));
  --lk-white-40: color-mix(in srgb, var(--lk-white) 40%, var(--lk-teal-deep));
  --lk-white-16: color-mix(in srgb, var(--lk-white) 16%, var(--lk-teal-deep));
  --lk-white-10: color-mix(in srgb, var(--lk-white) 10%, var(--lk-teal-deep));

  --lk-display: "Oswald", "Inter", system-ui, sans-serif;
  --lk-body: "Inter", system-ui, -apple-system, sans-serif;
  --lk-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  --lk-shadow-raise: -8px 0 20px -12px var(--lk-ink);

  /* Focus ring color: flipped to mint on teal surfaces (see .hero/.plate) */
  --lk-focus: var(--lk-teal);

  font-family: var(--lk-body);
  color: var(--lk-ink);
  font-size: 16px;
  line-height: 1.5;
  background: var(--lk-mint);
}

/* Shell: container widths from the design system (4px grid) */
.shell {
  max-width: 996px;
  margin-inline: auto;
  padding-inline: 24px;
}
.shell-narrow {
  max-width: 760px;
}
.shell-center {
  text-align: center;
}

/* Typography */
.display {
  font-family: var(--lk-display);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: 0.01em;
  margin: 0;
}
.display-hero {
  font-family: var(--lk-display);
  font-size: clamp(3.5rem, 9vw, 7.5rem);
  font-weight: 500;
  line-height: 1;
  margin: 24px 0 0;
  color: var(--lk-mint); /* large display: mint on deep teal (> 3:1) */
}
.display-section {
  font-family: var(--lk-display);
  font-size: clamp(3rem, 8vw, 5rem);
  margin-bottom: 48px;
}
.display-light {
  font-family: var(--lk-display);
  color: var(--lk-mint);
}

.kicker {
  font-family: var(--lk-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
}
.kicker-light {
  color: var(--lk-white);
}
.kicker-teal {
  color: var(--lk-teal-text);
}
.kicker-muted {
  color: var(--lk-muted-strong);
}

/* Buttons (boxed, mono label, 3px radius) */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--lk-mono);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 3px;
  padding: 12px 24px;
  transition:
    background-color 150ms ease,
    color 150ms ease,
    opacity 150ms ease,
    transform 150ms ease;
}
.btn:active {
  transform: scale(0.98);
}
.btn:focus-visible {
  outline: 2px solid var(--lk-focus);
  outline-offset: 2px;
}
.btn-light {
  background-color: var(--lk-white);
  color: var(--lk-teal);
}
.btn-light:hover {
  background-color: var(--lk-mint);
}
.btn-outline {
  background-color: transparent;
  color: var(--lk-white);
  box-shadow: inset 0 0 0 1px var(--lk-white-40);
}
.btn-outline:hover {
  background-color: var(--lk-white-10);
}
.btn-teal {
  background-color: var(--lk-teal);
  color: var(--lk-white);
}
.btn-teal:hover {
  background-color: var(--lk-teal-hover);
}
.btn-ghost-dark {
  background-color: transparent;
  color: var(--lk-ink);
  box-shadow: inset 0 0 0 1px var(--lk-line);
}
.btn-ghost-dark:hover {
  background-color: color-mix(in srgb, var(--lk-line) 8%, transparent);
}
.btn-compact {
  padding: 8px 16px;
}

/* ---------------------------------------------------------------------
   Hero — deep teal plate, mint paper below
   --------------------------------------------------------------------- */
.hero {
  --lk-focus: var(--lk-mint);
  background-color: var(--lk-teal-deep);
  color: var(--lk-white);
  padding: 96px 0 80px;
}
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 48px;
  align-items: start;
}
.hero-copy {
  padding-top: 8px;
}
.hero-tag {
  max-width: 44ch;
  margin: 24px 0 32px;
  color: var(--lk-white); /* plain white keeps ≥ 4.5:1 on the plate */
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}
.chip {
  font-family: var(--lk-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 3px;
  color: var(--lk-white);
  box-shadow: inset 0 0 0 1px var(--lk-white-40);
}
.chip-mint {
  color: var(--lk-mint);
  box-shadow: inset 0 0 0 1px var(--lk-white-40);
}

/* Terminals (must contain only real commands/outputs) */
.hero-panel {
  display: grid;
  gap: 16px;
}
.terminal {
  background-color: var(--lk-teal-ink);
  box-shadow: inset 0 0 0 1px var(--lk-white-16);
  border-radius: 8px;
  overflow: hidden;
}
.terminal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px;
  box-shadow: inset 0 -1px 0 var(--lk-white-16);
}
.terminal-label {
  font-family: var(--lk-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--lk-mint);
}
.terminal-label-dim {
  color: var(--lk-white-70);
}
.terminal-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
}
.terminal-tab {
  font-family: var(--lk-mono);
  font-size: 12px;
  color: var(--lk-white);
  background: transparent;
  border: 0;
  border-radius: 3px;
  padding: 4px 8px;
  cursor: pointer;
}
.terminal-tab:hover {
  background-color: var(--lk-white-10);
}
.terminal-tab.is-active {
  color: var(--lk-mint);
  background-color: var(--lk-white-10);
}
.terminal-tab:focus-visible,
.terminal-copy:focus-visible {
  outline: 2px solid var(--lk-focus);
  outline-offset: 2px;
}
.terminal-copy {
  font-family: var(--lk-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--lk-white);
  background: transparent;
  border: 0;
  border-radius: 3px;
  padding: 4px 8px;
  cursor: pointer;
  margin-left: 4px;
}
.terminal-copy:hover {
  background-color: var(--lk-white-10);
}
.terminal-body {
  padding: 16px;
}
.terminal-body-tall {
  display: grid;
  gap: 12px;
  align-content: start;
}
.terminal-body code {
  display: block;
  font-family: var(--lk-mono);
  font-size: 13px;
  line-height: 1.5;
  color: var(--lk-white);
  white-space: pre-wrap;
  word-break: break-word;
  user-select: all;
}
.t-dim {
  color: var(--lk-mint);
}

/* ---------------------------------------------------------------------
   Mint paper sections
   --------------------------------------------------------------------- */
.paper {
  background-color: var(--lk-mint);
  padding: 96px 0;
}
.paper-soft {
  background-color: var(--lk-white);
  border-block: 1px solid color-mix(in srgb, var(--lk-line) 30%, transparent);
}
.paper .display-section {
  color: var(--lk-ink);
}

/* ---------------------------------------------------------------------
   Steps — editorial poster style (reference: Programma):
   chips, dashed column separators, giant numerals sinking into a
   deep-teal result strip (CSS only, static, no SVG needed here).
   --------------------------------------------------------------------- */
.steps-wrap {
  position: relative;
}
.steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.step {
  padding-right: 24px;
}
.step + .step {
  border-left: 1px dashed color-mix(in srgb, var(--lk-line) 60%, transparent);
  padding-left: 24px;
}
.chip-step {
  display: inline-block;
  font-family: var(--lk-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background-color: var(--lk-teal);
  color: var(--lk-white);
  border-radius: 3px;
  padding: 4px 10px;
  margin: 0;
}
.step-title {
  font-family: var(--lk-display);
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  margin: 16px 0 12px;
}
.step-body {
  margin: 0 0 12px;
  font-size: 15px;
  color: color-mix(in srgb, var(--lk-ink) 72%, var(--lk-mint));
}
.step-link {
  font-family: var(--lk-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--lk-teal-text);
  text-decoration: none;
}
.step-link:hover,
.step-link:focus-visible {
  text-decoration: underline;
}
.step-link:focus-visible {
  outline: 2px solid var(--lk-focus);
  outline-offset: 2px;
}
.steps-nums {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 40px 0 -0.5em;
  font-family: var(--lk-display);
  font-size: clamp(5.5rem, 12vw, 10rem);
  font-weight: 500;
  line-height: 0.85;
  color: var(--lk-teal);
  -webkit-text-stroke: 2px var(--lk-mint);
  position: relative;
  z-index: 1;
}
.steps-nums span {
  display: block;
}
.steps-nums span:not(:first-child) {
  padding-left: 24px;
}
.steps-strip {
  position: relative;
  background-color: var(--lk-teal-deep);
  border-radius: 3px;
  padding: 96px 24px 16px;
}
.steps-strip p {
  margin: 0;
  font-family: var(--lk-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--lk-mint);
}

/* Feature grid */
.feature-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.feature {
  display: block;
  height: 100%;
  background-color: var(--lk-mint);
  border: 1px solid color-mix(in srgb, var(--lk-line) 45%, transparent);
  border-radius: 3px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease,
    transform 150ms ease;
}
.feature:hover {
  border-color: var(--lk-teal);
  box-shadow: var(--lk-shadow-raise);
  transform: translateY(-4px);
}
.feature:focus-visible {
  outline: 2px solid var(--lk-focus);
  outline-offset: 2px;
}
.feature-title {
  font-family: var(--lk-display);
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin: 8px 0 8px;
  color: var(--lk-teal); /* 24px display: 3:1 suffices, teal is 4:1 on mint */
}
.feature-body {
  margin: 0;
  font-size: 14px;
  color: color-mix(in srgb, var(--lk-ink) 72%, var(--lk-mint));
}
.note {
  margin: 24px 0 0;
  font-size: 13px;
  color: var(--lk-muted-strong);
}
.note a {
  color: var(--lk-teal-text);
}
.note a:hover,
.note a:focus-visible {
  text-decoration: underline;
}

/* ---------------------------------------------------------------------
   Plugins plate (deep teal)
   --------------------------------------------------------------------- */
.plate {
  --lk-focus: var(--lk-mint);
  background-color: var(--lk-teal-deep);
  color: var(--lk-white);
  padding: 96px 0;
}
.plate-tag {
  max-width: 52ch;
  margin: -24px 0 40px;
  color: var(--lk-white);
}
.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}
.plugin {
  background-color: var(--lk-white-10);
  box-shadow: inset 0 0 0 1px var(--lk-white-40);
  border-radius: 3px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.plugin-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.plugin-name {
  font-family: var(--lk-mono);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0;
  color: var(--lk-white);
}
.plugin-status {
  font-family: var(--lk-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--lk-white);
  white-space: nowrap;
}
.plugin-tagline {
  margin: 0;
  font-size: 15px;
  color: var(--lk-white);
}
.plugin-tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0;
}
.plugin-tags li {
  font-family: var(--lk-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--lk-mint);
  padding: 4px 8px;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px var(--lk-white-40);
}
.plugin-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

/* ---------------------------------------------------------------------
   Compatibility table (reference table pattern)
   --------------------------------------------------------------------- */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th {
  text-align: left;
  font-family: var(--lk-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--lk-muted-strong);
  padding: 8px 12px;
  border-bottom: 1px solid var(--lk-line);
}
.table td {
  padding: 12px;
  font-size: 15px;
  border-bottom: 1px solid color-mix(in srgb, var(--lk-line) 45%, transparent);
}

/* CTA */
.shell-center .display-section {
  margin-bottom: 32px;
}
.shell-center .hero-actions {
  justify-content: center;
}

/* Disclaimer strip */
.strip {
  background-color: var(--lk-mint);
  text-align: center;
  padding: 24px 16px;
}
.strip p {
  font-family: var(--lk-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--lk-muted-strong);
  margin: 0;
}

/* ---------------------------------------------------------------------
   Scroll reveal — layered on top, removed entirely for reduced motion
   --------------------------------------------------------------------- */
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] {
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity 480ms ease-out,
      transform 480ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  [data-reveal].is-revealed {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .btn,
  .feature {
    transition: none;
  }
}

/* ---------------------------------------------------------------------
   Responsive (4px grid)
   --------------------------------------------------------------------- */
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .steps {
    grid-template-columns: 1fr;
    gap: 24px 0;
  }
  .step + .step {
    border-left: 0;
    border-top: 1px dashed color-mix(in srgb, var(--lk-line) 60%, transparent);
    padding-left: 0;
    padding-top: 24px;
  }
  .steps-nums {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 32px;
  }
  .steps-nums span:not(:first-child) {
    padding-left: 0;
  }
  .steps-strip {
    padding-top: 72px;
  }
}
</style>
