<script setup lang="ts">
interface Props {
  status: "stable" | "experimental" | "planned";
}

const props = defineProps<Props>();

const config = {
  stable: { label: "Stable", class: "lakreet-badge stable" },
  experimental: { label: "Experimental", class: "lakreet-badge experimental" },
  planned: { label: "Planned", class: "lakreet-badge planned" },
} as const;

const { label, class: badgeClass } = config[props.status];
</script>

<template>
  <span :class="badgeClass" :aria-label="`Status: ${label}`">
    {{ label }}
  </span>
</template>

<style scoped>
.lakreet-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--vp-border-radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.lakreet-badge.stable {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.lakreet-badge.experimental {
  background-color: #fff8e1;
  color: #b48600;
}

.lakreet-badge.planned {
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
}

.dark .lakreet-badge.experimental {
  background-color: #3d2e00;
  color: #ffcc00;
}
</style>
