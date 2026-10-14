<script setup lang="ts">
import { ref, computed } from "vue";
import { unzipSync, strFromU8 } from "fflate";

interface Control {
  name: string;
  type: string;
  value?: unknown;
  group?: string;
}

interface Manifest {
  version: number;
  format: string;
  name: string;
  width: number;
  height: number;
  duration: number;
  frameRate: number;
  controls: Control[];
  media: Array<{ name: string; item: string; files: string[] }>;
}

const file = ref<File | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const manifest = ref<Manifest | null>(null);
const rows = ref<number>(1);
const delimiter = ref(",");
const includeBOM = ref(false);
const csvOutput = ref("");
const showOutput = ref(false);
const warnings = ref<string[]>([]);

const supportedTypes = ["text", "slider", "checkbox"];
const typeWarnings = ref<Record<string, string>>({});

function validateFile(f: File): string | null {
  if (f.size > 50 * 1024 * 1024) return "File too large (max 50 MB)";
  if (!f.name.endsWith(".ectemplate")) return "Must be a .ectemplate file";
  return null;
}

async function parseTemplate() {
  if (!file.value) return;

  loading.value = true;
  error.value = null;
  warnings.value = [];
  typeWarnings.value = {};
  manifest.value = null;
  csvOutput.value = "";
  showOutput.value = false;

  const err = validateFile(file.value);
  if (err) {
    error.value = err;
    loading.value = false;
    return;
  }

  try {
    const arrayBuffer = await file.value.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);

    // Unzip
    const unzipped = unzipSync(uint8);

    // Check size
    let totalUnzipped = 0;
    for (const [, content] of Object.entries(unzipped)) {
      totalUnzipped += content.length;
    }
    if (totalUnzipped > 5 * 1024 * 1024) {
      throw new Error("Unzipped size exceeds 5 MB limit");
    }

    // Read manifest.json
    const manifestFile = unzipped["manifest.json"];
    if (!manifestFile) throw new Error("manifest.json not found in template");

    const manifestText = strFromU8(manifestFile);
    const parsed = JSON.parse(manifestText) as Manifest;

    // Validate format
    if (parsed.format !== "effectcraft-template") {
      warnings.value.push(
        `Unexpected format: "${parsed.format}" (expected "effectcraft-template")`,
      );
    }
    if (parsed.version !== 1) {
      warnings.value.push(
        `Manifest version ${parsed.version} is not version 1`,
      );
    }

    // Check control types
    for (const c of parsed.controls) {
      if (!supportedTypes.includes(c.type)) {
        typeWarnings.value[c.name] =
          `Type "${c.type}" not supported — will be treated as text`;
      }
    }

    manifest.value = parsed;

    // Generate initial CSV
    generateCSV();
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to parse template";
  } finally {
    loading.value = false;
  }
}

function generateCSV() {
  if (!manifest.value) return;

  const controls = manifest.value.controls;
  const headers = controls.map((c) => c.name);

  // Build rows
  const allRows: string[][] = [headers];

  for (let i = 0; i < rows.value; i++) {
    const row: string[] = [];
    for (const c of controls) {
      if (i === 0 && c.value !== undefined) {
        row.push(escapeCSV(String(c.value)));
      } else {
        row.push("");
      }
    }
    allRows.push(row);
  }

  // Join with delimiter
  const lines = allRows.map((r) => r.join(delimiter.value));
  let csv = lines.join("\r\n") + "\r\n";

  // Add BOM
  if (includeBOM.value) {
    csv = "\uFEFF" + csv;
  }

  csvOutput.value = csv;
  showOutput.value = true;

  // Check for formula injection
  checkFormulaInjection(allRows);
}

function escapeCSV(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
}

function checkFormulaInjection(rows: string[][]) {
  warnings.value = warnings.value.filter((w) => !w.startsWith("⚠ Formula"));
  for (let r = 1; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      const cell = rows[r][c];
      if (/^[@=+-]/.test(cell.trim())) {
        warnings.value.push(
          `⚠ Formula injection risk: Row ${r}, Column "${rows[0][c]}" starts with "${cell.trim()[0]}"`,
        );
      }
    }
  }
}

function downloadCSV() {
  if (!csvOutput.value) return;
  const blob = new Blob([csvOutput.value], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function loadSample() {
  // Fetch the example template
  fetch("/examples/title2.ectemplate")
    .then((r) => r.arrayBuffer())
    .then((buf) => {
      const file = new File([buf], "title2.ectemplate", {
        type: "application/zip",
      });
      handleFile(file);
    })
    .catch(() => {
      error.value = "Failed to load sample template";
    });
}

function handleFile(f: File) {
  file.value = f;
  parseTemplate();
}

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    handleFile(target.files[0]);
  }
}

function removeFile() {
  file.value = null;
  manifest.value = null;
  csvOutput.value = "";
  showOutput.value = false;
  error.value = null;
  warnings.value = [];
  typeWarnings.value = {};
}
</script>

<template>
  <div class="csv-generator">
    <header style="margin-bottom: var(--vp-spacing-6)">
      <h1>CSV Generator</h1>
      <p style="color: var(--vp-c-text-2); margin-top: var(--vp-spacing-2)">
        Upload an <code>.ectemplate</code> file to generate a ready-to-fill CSV.
        Everything runs in your browser — nothing is uploaded.
      </p>
    </header>

    <!-- File Upload -->
    <section
      class="card"
      style="margin-bottom: var(--vp-spacing-6); padding: var(--vp-spacing-5)"
    >
      <h2 style="margin: 0 0 var(--vp-spacing-4); font-size: 1.125rem">
        1. Choose Template
      </h2>

      <div
        v-if="!file"
        class="upload-area"
        style="
          border: 2px dashed var(--vp-c-divider);
          border-radius: var(--vp-border-radius-md);
          padding: var(--vp-spacing-8);
          text-align: center;
          cursor: pointer;
          transition:
            border-color var(--vp-transition-fast),
            background-color var(--vp-transition-fast);
        "
        @click="$refs.fileInput?.click()"
        @dragover.prevent
        @drop.prevent="onDrop"
      >
        <input
          ref="fileInput"
          type="file"
          accept=".ectemplate"
          @change="onFileChange"
          style="display: none"
        />
        <div style="font-size: 2rem; margin-bottom: var(--vp-spacing-3)">
          📁
        </div>
        <p style="margin: 0 0 var(--vp-spacing-2); color: var(--vp-c-text-1)">
          Drag & drop or click to select <code>.ectemplate</code>
        </p>
        <p style="margin: 0; font-size: 0.8125rem; color: var(--vp-c-text-2)">
          Max 50 MB • Unzipped max 5 MB • Nothing leaves your browser
        </p>
      </div>

      <div
        v-else
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--vp-spacing-4);
          flex-wrap: wrap;
        "
      >
        <div
          style="display: flex; align-items: center; gap: var(--vp-spacing-3)"
        >
          <span style="font-weight: 500">{{ file?.name }}</span>
          <span style="font-size: 0.8125rem; color: var(--vp-c-text-2)">
            ({{ (file!.size / 1024).toFixed(1) }} KB)
          </span>
        </div>
        <button
          @click="removeFile"
          class="vp-button-alt"
          style="
            padding: var(--vp-spacing-1) var(--vp-spacing-3);
            font-size: 0.8125rem;
          "
        >
          Remove
        </button>
      </div>

      <div
        v-if="error"
        class="custom-block danger"
        style="margin-top: var(--vp-spacing-4)"
      >
        {{ error }}
      </div>

      <div
        v-if="warnings.length"
        class="custom-block warning"
        style="margin-top: var(--vp-spacing-4)"
      >
        <p v-for="w in warnings" :key="w" style="margin: var(--vp-spacing-1) 0">
          {{ w }}
        </p>
      </div>

      <div style="margin-top: var(--vp-spacing-4)">
        <button
          @click="loadSample"
          class="vp-button-alt"
          style="font-size: 0.8125rem"
        >
          Try sample template (title2.ectemplate)
        </button>
      </div>
    </section>

    <!-- Template Info -->
    <section
      v-if="manifest"
      class="card"
      style="margin-bottom: var(--vp-spacing-6); padding: var(--vp-spacing-5)"
    >
      <h2 style="margin: 0 0 var(--vp-spacing-4); font-size: 1.125rem">
        2. Template Info
      </h2>

      <dl
        style="
          margin: 0;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--vp-spacing-2) var(--vp-spacing-4);
          font-size: 0.875rem;
        "
      >
        <dt>Name</dt>
        <dd style="margin: 0">{{ manifest.name }}</dd>
        <dt>Resolution</dt>
        <dd style="margin: 0">{{ manifest.width }}×{{ manifest.height }}</dd>
        <dt>Duration</dt>
        <dd style="margin: 0">
          {{ manifest.duration }}s @ {{ manifest.frameRate }}fps
        </dd>
        <dt>Controls</dt>
        <dd style="margin: 0">{{ manifest.controls.length }}</dd>
      </dl>

      <h3
        style="
          margin: var(--vp-spacing-4) 0 var(--vp-spacing-2);
          font-size: 0.875rem;
        "
      >
        Controls
      </h3>
      <table
        style="width: 100%; border-collapse: collapse; font-size: 0.8125rem"
      >
        <thead>
          <tr
            style="
              text-align: left;
              border-bottom: 1px solid var(--vp-c-divider);
            "
          >
            <th style="padding: var(--vp-spacing-2)">Name</th>
            <th style="padding: var(--vp-spacing-2)">Type</th>
            <th style="padding: var(--vp-spacing-2)">Default</th>
            <th style="padding: var(--vp-spacing-2)">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in manifest.controls"
            :key="c.name"
            style="border-bottom: 1px solid var(--vp-c-divider-light)"
          >
            <td
              style="
                padding: var(--vp-spacing-2);
                font-family: var(--vp-font-family-mono);
              "
            >
              {{ c.name }}
            </td>
            <td style="padding: var(--vp-spacing-2)">{{ c.type }}</td>
            <td
              style="
                padding: var(--vp-spacing-2);
                font-family: var(--vp-font-family-mono);
              "
            >
              {{ c.value !== undefined ? JSON.stringify(c.value) : "—" }}
            </td>
            <td style="padding: var(--vp-spacing-2)">
              <StatusBadge
                :status="
                  supportedTypes.includes(c.type) ? 'stable' : 'experimental'
                "
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="Object.keys(typeWarnings).length"
        class="custom-block warning"
        style="margin-top: var(--vp-spacing-3)"
      >
        <p
          v-for="(msg, name) in typeWarnings"
          :key="name"
          style="margin: var(--vp-spacing-1) 0"
        >
          <code>{{ name }}</code
          >: {{ msg }}
        </p>
      </div>
    </section>

    <!-- CSV Options -->
    <section
      v-if="manifest"
      class="card"
      style="margin-bottom: var(--vp-spacing-6); padding: var(--vp-spacing-5)"
    >
      <h2 style="margin: 0 0 var(--vp-spacing-4); font-size: 1.125rem">
        3. CSV Options
      </h2>

      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--vp-spacing-4);
        "
      >
        <div>
          <label
            style="
              display: block;
              margin-bottom: var(--vp-spacing-1);
              font-size: 0.8125rem;
            "
            >Rows</label
          >
          <input
            v-model.number="rows"
            type="number"
            min="1"
            max="10000"
            style="
              width: 100%;
              padding: var(--vp-spacing-2) var(--vp-spacing-3);
              border: 1px solid var(--vp-c-divider);
              border-radius: var(--vp-border-radius-md);
              background: var(--vp-c-bg);
              color: var(--vp-c-text-1);
              font-family: inherit;
            "
            @input="generateCSV"
          />
        </div>

        <div>
          <label
            style="
              display: block;
              margin-bottom: var(--vp-spacing-1);
              font-size: 0.8125rem;
            "
            >Delimiter</label
          >
          <select
            v-model="delimiter"
            style="
              width: 100%;
              padding: var(--vp-spacing-2) var(--vp-spacing-3);
              border: 1px solid var(--vp-c-divider);
              border-radius: var(--vp-border-radius-md);
              background: var(--vp-c-bg);
              color: var(--vp-c-text-1);
              font-family: inherit;
            "
            @change="generateCSV"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab (\t)</option>
          </select>
        </div>

        <div style="display: flex; align-items: flex-end">
          <label
            style="
              display: flex;
              align-items: center;
              gap: var(--vp-spacing-2);
              cursor: pointer;
            "
          >
            <input type="checkbox" v-model="includeBOM" @change="generateCSV" />
            <span style="font-size: 0.8125rem">UTF-8 BOM</span>
          </label>
        </div>
      </div>
    </section>

    <!-- Output -->
    <section
      v-if="showOutput"
      class="card"
      style="margin-bottom: var(--vp-spacing-6); padding: var(--vp-spacing-5)"
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--vp-spacing-4);
          flex-wrap: wrap;
          gap: var(--vp-spacing-3);
        "
      >
        <h2 style="margin: 0; font-size: 1.125rem">4. Generated CSV</h2>
        <div style="display: flex; gap: var(--vp-spacing-2)">
          <button
            @click="downloadCSV"
            class="vp-button-brand"
            style="padding: var(--vp-spacing-2) var(--vp-spacing-4)"
          >
            Download CSV
          </button>
          <button
            @click="copyCSV"
            class="vp-button-alt"
            style="padding: var(--vp-spacing-2) var(--vp-spacing-4)"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>

      <div
        v-if="warnings.length"
        class="custom-block warning"
        style="margin-bottom: var(--vp-spacing-3)"
      >
        <p v-for="w in warnings" :key="w" style="margin: var(--vp-spacing-1) 0">
          {{ w }}
        </p>
      </div>

      <pre
        style="
          max-height: 400px;
          overflow: auto;
          margin: 0;
          padding: var(--vp-spacing-4);
          background: var(--vp-c-bg-soft);
          border: 1px solid var(--vp-c-divider);
          border-radius: var(--vp-border-radius-md);
          font-size: 0.75rem;
          line-height: 1.5;
          font-family: var(--vp-font-family-mono);
        "
      ><code>{{ csvOutput }}</code></pre>
    </section>

    <!-- Privacy Notice -->
    <section
      class="card"
      style="
        padding: var(--vp-spacing-4);
        border-left: 3px solid var(--vp-c-brand-1);
      "
    >
      <h3 style="margin: 0 0 var(--vp-spacing-2); font-size: 0.875rem">
        Privacy
      </h3>
      <ul
        style="
          margin: 0;
          padding-left: var(--vp-spacing-5);
          font-size: 0.8125rem;
          color: var(--vp-c-text-2);
        "
      >
        <li>No data leaves your browser</li>
        <li>No analytics, tracking, or cookies</li>
        <li>No server-side processing</li>
        <li>
          Only network request: fetching the sample template from this site
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.csv-generator {
  max-width: 900px;
  margin: 0 auto;
}

.card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--vp-border-radius-md);
}

.upload-area:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.upload-area:focus-within {
  outline: none;
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

pre code {
  white-space: pre-wrap;
  word-break: break-all;
}

@media (max-width: 640px) {
  .csv-generator h1 {
    font-size: 1.5rem;
  }
  table {
    font-size: 0.75rem;
  }
}
</style>
