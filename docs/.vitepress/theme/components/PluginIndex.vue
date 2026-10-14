<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PluginCard from './PluginCard.vue'

interface Plugin {
  id: string
  name: string
  tagline: string
  status: string
  version: string
  repo: string
  docs: string
  tags: string[]
  category: string
}

// Load plugins data via fetch at runtime
const allPlugins = ref<Plugin[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function loadPlugins() {
  try {
    const response = await fetch('/data/plugins.json')
    if (!response.ok) throw new Error(`Failed to load: ${response.status}`)
    allPlugins.value = await response.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

onMounted(loadPlugins)

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedStatus = ref('all')

const categories = computed(() => {
  const cats = new Set(allPlugins.value.map(p => p.category))
  return ['all', ...Array.from(cats)]
})

const statuses = computed(() => {
  const stats = new Set(allPlugins.value.map(p => p.status))
  return ['all', ...Array.from(stats)]
})

const filteredPlugins = computed(() => {
  return allPlugins.value.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          plugin.tagline.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          plugin.tags.some(t => t.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesCategory = selectedCategory.value === 'all' || plugin.category === selectedCategory.value
    const matchesStatus = selectedStatus.value === 'all' || plugin.status === selectedStatus.value
    return matchesSearch && matchesCategory && matchesStatus
  })
})
</script>

<template>
  <div class="plugin-index">
    <header style="margin-bottom: var(--vp-spacing-6);">
      <h1 style="margin: 0 0 var(--vp-spacing-2);">Plugins</h1>
      <p style="margin: 0; color: var(--vp-c-text-2);">Official Lakreet plugins for video automation and creative workflows.</p>
    </header>

    <div v-if="loading" style="text-align: center; padding: var(--vp-spacing-8); color: var(--vp-c-text-2);">
      Loading plugins…
    </div>

    <div v-else-if="error" class="custom-block danger" style="margin-bottom: var(--vp-spacing-6);">
      <p>Failed to load plugins: {{ error }}</p>
    </div>

    <div v-else>
      <div class="filters" style="display: flex; flex-wrap: wrap; gap: var(--vp-spacing-3); margin-bottom: var(--vp-spacing-6); align-items: center;">
        <div class="search-wrapper" style="flex: 1; min-width: 200px; position: relative;">
          <label for="plugin-search" class="sr-only">Search plugins</label>
          <input
            id="plugin-search"
            v-model="searchQuery"
            type="search"
            placeholder="Search plugins…"
            style="width: 100%; padding: var(--vp-spacing-2) var(--vp-spacing-3); border: 1px solid var(--vp-c-divider); border-radius: var(--vp-border-radius-md); background: var(--vp-c-bg); color: var(--vp-c-text-1); font-family: inherit; font-size: 0.875rem;"
            aria-label="Search plugins"
          >
        </div>

        <div class="filter-group" style="display: flex; gap: var(--vp-spacing-2);">
          <label for="category-filter" class="sr-only">Filter by category</label>
          <select
            id="category-filter"
            v-model="selectedCategory"
            style="padding: var(--vp-spacing-2) var(--vp-spacing-3); border: 1px solid var(--vp-c-divider); border-radius: var(--vp-border-radius-md); background: var(--vp-c-bg); color: var(--vp-c-text-1); font-family: inherit; font-size: 0.8125rem;"
            aria-label="Filter by category"
          >
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat === 'all' ? 'All categories' : cat }}
            </option>
          </select>

          <label for="status-filter" class="sr-only">Filter by status</label>
          <select
            id="status-filter"
            v-model="selectedStatus"
            style="padding: var(--vp-spacing-2) var(--vp-spacing-3); border: 1px solid var(--vp-c-divider); border-radius: var(--vp-border-radius-md); background: var(--vp-c-bg); color: var(--vp-c-text-1); font-family: inherit; font-size: 0.8125rem;"
            aria-label="Filter by status"
          >
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status === 'all' ? 'All statuses' : status.charAt(0).toUpperCase() + status.slice(1) }}
            </option>
          </select>
        </div>
      </div>

      <div class="plugins-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--vp-spacing-4);">
        <PluginCard v-for="plugin in filteredPlugins" :key="plugin.id" :plugin="plugin" />
      </div>

      <p v-if="filteredPlugins.length === 0" style="text-align: center; color: var(--vp-c-text-2); padding: var(--vp-spacing-8);">
        No plugins match your filters.
      </p>
    </div>

    <footer style="margin-top: var(--vp-spacing-8); padding-top: var(--vp-spacing-6); border-top: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); font-size: 0.8125rem; text-align: center;">
      <p>Independent project. Not affiliated with the ArtCraft team or the EffectCraft project.</p>
    </footer>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

@media (max-width: 640px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .search-wrapper {
    width: 100%;
  }

  .filter-group {
    width: 100%;
  }

  .plugins-grid {
    grid-template-columns: 1fr;
  }
}
</style>