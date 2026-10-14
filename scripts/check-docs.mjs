#!/usr/bin/env node

// check-docs.mjs - Validate documentation structure and frontmatter
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const docsDir = join(__dirname, "..", "docs");
const internalDir = join(__dirname, "..", "internal");

const VALID_TYPES = [
  "tutorial",
  "how-to",
  "reference",
  "explanation",
  "recipe",
  "tool",
  "hub",
];
const VALID_STATUSES = ["stable", "experimental", "planned"];

let hasErrors = false;
let hasWarnings = false;

function error(msg) {
  console.error(`ERROR: ${msg}`);
  hasErrors = true;
}

function warning(msg) {
  console.warn(`WARNING: ${msg}`);
  hasWarnings = true;
}

function success(msg) {
  console.log(`OK: ${msg}`);
}

function parseYamlFrontmatter(yaml) {
  const fm = {};
  let currentKey = null;
  let inVerified = false;

  for (const line of yaml.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check for top-level key: value
    const match = trimmed.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const key = match[1];
      let value = match[2].trim();

      // Handle quoted strings
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }

      if (key === "verified") {
        inVerified = true;
        fm.verified = {};
      } else {
        inVerified = false;
        fm[key] = value;
      }
      continue;
    }

    // Handle array items under verified:
    if (inVerified) {
      const verifiedMatch = trimmed.match(/^-\s*(\w+):\s*(.*)$/);
      if (verifiedMatch) {
        let value = verifiedMatch[2].trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        fm.verified[verifiedMatch[1]] = value;
      }
    }
  }

  return fm;
}

function readFrontmatter(filePath) {
  const content = readFileSync(filePath, "utf8");
  const match = content.match(/^---([\s\S]*?)---/);
  if (!match) return null;
  const yaml = match[1];
  return parseYamlFrontmatter(yaml);
}

function checkFile(filePath) {
  const relPath = relative(docsDir, filePath);

  // Skip non-markdown files
  if (extname(filePath) !== ".md") return true;

  const fm = readFrontmatter(filePath);

  // Check if it's a planned page
  const isPlanned = fm?.status === "planned";

  // Required frontmatter fields
  const requiredFields = [
    "title",
    "description",
    "type",
    "status",
    "since",
    "verified",
  ];
  if (isPlanned) {
    requiredFields.splice(requiredFields.indexOf("verified"), 1);
    requiredFields.splice(requiredFields.indexOf("since"), 1);
  }

  for (const field of requiredFields) {
    if (!fm || !fm[field]) {
      error(`${relPath}: missing required frontmatter field: ${field}`);
      return false;
    }
  }

  // Validate type
  if (fm && !VALID_TYPES.includes(fm.type)) {
    error(
      `${relPath}: invalid type "${fm.type}". Must be one of: ${VALID_TYPES.join(", ")}`,
    );
    return false;
  }

  // Validate status
  if (fm && !VALID_STATUSES.includes(fm.status)) {
    error(
      `${relPath}: invalid status "${fm.status}". Must be one of: ${VALID_STATUSES.join(", ")}`,
    );
    return false;
  }

  // Check for placeholders in non-planned pages (excluding intentional TODO placeholders)
  if (!isPlanned) {
    const content = readFileSync(filePath, "utf8");
    const placeholderPatterns = ["[ ]", "lorem"];
    for (const pattern of placeholderPatterns) {
      if (content.includes(pattern)) {
        error(
          `${relPath}: contains placeholder "${pattern}" in non-planned page`,
        );
        return false;
      }
    }
    // "TODO: written by /page" is allowed as intentional placeholder
    if (content.includes("TODO:") && !content.includes("written by /page")) {
      error(`${relPath}: contains unexpected TODO placeholder`);
      return false;
    }
  }

  return true;
}

function getAllMdFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdFiles(fullPath));
    } else if (entry.isFile() && extname(entry.name) === ".md") {
      files.push(fullPath);
    }
  }
  return files;
}

function checkSitemapLinks() {
  const configPath = join(docsDir, ".vitepress", "config.mts");
  if (!existsSync(configPath)) return;

  const config = readFileSync(configPath, "utf8");

  // Extract sidebar links (simplified - just check that referenced files exist)
  const linkMatches = config.matchAll(/"\/swarm\/[^"]+"/g);
  for (const match of linkMatches) {
    const link = match[0].slice(1, -1); // Remove quotes
    // Handle directory index (e.g., /swarm/reference/cli/ -> /swarm/reference/cli/index.md)
    let filePath = join(docsDir, link.slice(1));
    if (link.endsWith("/")) {
      filePath = join(filePath, "index.md");
    } else {
      filePath = filePath + ".md";
    }
    if (!existsSync(filePath)) {
      error(`Sidebar link "${link}" points to non-existent file: ${filePath}`);
    }
  }
}

function checkVerifiedVersions() {
  const versionPath = join(internalDir, "facts", "version.txt");
  if (!existsSync(versionPath)) {
    warning(
      "internal/facts/version.txt not found, skipping verified version check",
    );
    return;
  }

  const currentVersion = readFileSync(versionPath, "utf8").trim();

  for (const file of getAllMdFiles(docsDir)) {
    const fm = readFrontmatter(file);
    if (fm?.verified?.swarm) {
      const verifiedVersion = fm.verified.swarm;
      if (verifiedVersion !== currentVersion) {
        const relPath = relative(docsDir, file);
        warning(
          `${relPath}: verified.swarm (${verifiedVersion}) differs from current version (${currentVersion})`,
        );
      }
    }
  }
}

// Main
console.log("Checking documentation...\n");

const mdFiles = getAllMdFiles(docsDir);
console.log(`Found ${mdFiles.length} markdown files\n`);

for (const file of mdFiles) {
  checkFile(file);
}

console.log("\nChecking sidebar links...");
checkSitemapLinks();

console.log("\nChecking verified versions...");
checkVerifiedVersions();

console.log("\n--- Summary ---");
if (hasErrors) {
  console.log("FAILED: Documentation has errors");
  process.exit(1);
} else if (hasWarnings) {
  console.log("PASSED with warnings");
  process.exit(0);
} else {
  console.log("PASSED: All checks passed");
  process.exit(0);
}
