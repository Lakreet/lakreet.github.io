<script setup lang="ts">
interface Props {
  version: string;
}

const props = defineProps<Props>();
</script>

<template>
  <span class="lakreet-since" :aria-label="`Since version ${props.version}`">
    Since v{{ props.version }}
  </span>
</template>

<style scoped>
.lakreet-since {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--vp-border-radius-sm);
  font-size: 0.7rem;
  font-weight: 500;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
