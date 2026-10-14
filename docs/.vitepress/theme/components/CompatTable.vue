<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

interface CompatData {
  testedEffectCraft: string[];
  testedNode: string[];
  testedOS: string[];
  notes?: string;
}

const compat = ref<CompatData | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const res = await fetch("/data/compat.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    compat.value = await res.json();
  } catch (e) {
    error.value =
      e instanceof Error ? e.message : "Failed to load compatibility data";
  } finally {
    loading.value = false;
  }
});

const sections = computed(() => {
  if (!compat.value) return {};
  return {
    EffectCraft: compat.value.testedEffectCraft,
    "Node.js": compat.value.testedNode,
    OS: compat.value.testedOS.map((os) => {
      const names: Record<string, string> = {
        win32: "Windows",
        linux: "Linux",
        darwin: "macOS",
      };
      return names[os] || os;
    }),
  };
});
</script>

<template>
  <div class="compat-table">
    <div v-if="loading" class="compat-loading">Loading compatibility data…</div>

    <div v-else-if="error" class="custom-block danger">
      <p>Failed to load compatibility data: {{ error }}</p>
    </div>

    <div v-else-if="compat">
      <div
        class="compat-section"
        v-for="(versions, key) in sections"
        :key="key"
      >
        <h4>{{ key }}</h4>
        <ul class="compat-list">
          <li v-for="v in versions" :key="v">
            <span class="compat-badge">{{ v }}</span>
          </li>
        </ul>
      </div>

      <p v-if="compat.notes" class="compat-notes">{{ compat.notes }}</p>
    </div>
  </div>
</template>

<style scoped>
.compat-section {
  margin-bottom: var(--vp-spacing-5);
}

.compat-section h4 {
  margin: 0 0 var(--vp-spacing-2);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.compat-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--vp-spacing-2);
  list-style: none;
  padding: 0;
  margin: 0;
}

.compat-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--vp-border-radius-sm);
  font-size: 0.8125rem;
  font-weight: 500;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
}

.compat-notes {
  margin: var(--vp-spacing-4) 0 0;
  padding: var(--vp-spacing-3);
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border-radius: var(--vp-border-radius-sm);
  border-left: 3px solid var(--vp-c-brand-1);
}

.compat-loading {
  padding: var(--vp-spacing-4);
  color: var(--vp-c-text-2);
  text-align: center;
}
</style>
