<script setup lang="ts">
import type { Plugin } from "../../public/data/plugins.json";

interface Props {
  plugin: Plugin;
}

const props = defineProps<Props>();

function getStatusBadge(status: string) {
  const badges: Record<string, { label: string; class: string }> = {
    stable: { label: "Stable", class: "lakreet-badge stable" },
    experimental: {
      label: "Experimental",
      class: "lakreet-badge experimental",
    },
    planned: { label: "Planned", class: "lakreet-badge planned" },
  };
  return badges[status] ?? { label: status, class: "lakreet-badge planned" };
}
</script>

<template>
  <article
    class="lakreet-card"
    style="display: flex; flex-direction: column; height: 100%"
  >
    <header
      style="
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--vp-spacing-3);
      "
    >
      <div>
        <h3 style="margin: 0 0 var(--vp-spacing-1); font-size: 1.125rem">
          {{ plugin.name }}
        </h3>
        <p style="margin: 0; color: var(--vp-c-text-2); font-size: 0.875rem">
          {{ plugin.tagline }}
        </p>
      </div>
      <span :class="getStatusBadge(plugin.status).class">{{
        getStatusBadge(plugin.status).label
      }}</span>
    </header>

    <dl
      style="
        margin: 0 0 var(--vp-spacing-3);
        font-size: 0.8125rem;
        color: var(--vp-c-text-2);
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--vp-spacing-1) var(--vp-spacing-3);
      "
    >
      <dt>Version</dt>
      <dd style="margin: 0">{{ plugin.version }}</dd>
      <dt>Category</dt>
      <dd style="margin: 0">{{ plugin.category }}</dd>
    </dl>

    <div
      style="
        display: flex;
        flex-wrap: wrap;
        gap: var(--vp-spacing-1);
        margin-bottom: var(--vp-spacing-3);
      "
      aria-label="Tags"
    >
      <span
        v-for="tag in plugin.tags"
        :key="tag"
        class="lakreet-badge planned"
        style="font-size: 0.6875rem; text-transform: uppercase"
        >{{ tag }}</span
      >
    </div>

    <footer
      style="
        display: flex;
        gap: var(--vp-spacing-3);
        margin-top: auto;
        padding-top: var(--vp-spacing-3);
        border-top: 1px solid var(--vp-c-divider);
      "
    >
      <a
        :href="plugin.docs"
        class="vp-button-brand"
        style="
          flex: 1;
          text-align: center;
          padding: var(--vp-spacing-2) var(--vp-spacing-3);
          font-size: 0.8125rem;
        "
        >Docs</a
      >
      <a
        :href="plugin.repo"
        class="vp-button-alt"
        style="
          flex: 1;
          text-align: center;
          padding: var(--vp-spacing-2) var(--vp-spacing-3);
          font-size: 0.8125rem;
        "
        >Repo</a
      >
    </footer>
  </article>
</template>

<style scoped>
.lakreet-card {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--vp-border-radius-md);
  padding: var(--vp-spacing-4);
  transition:
    box-shadow var(--vp-transition-normal),
    border-color var(--vp-transition-fast);
}

.lakreet-card:hover {
  box-shadow: var(--vp-shadow-md);
  border-color: var(--vp-c-brand-1);
}

.vp-button-brand,
.vp-button-alt {
  text-decoration: none;
  border-radius: var(--vp-border-radius-sm);
  font-weight: 500;
  transition:
    background-color var(--vp-transition-fast),
    color var(--vp-transition-fast);
}

.vp-button-brand {
  background-color: var(--vp-c-brand-1);
  color: white;
}

.vp-button-brand:hover {
  background-color: var(--vp-c-brand-2);
}

.vp-button-alt {
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.vp-button-alt:hover {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
