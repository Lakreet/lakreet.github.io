<script setup lang="ts">
// Toggles the `is-home` class on <html> so global CSS can restyle the
// navbar (blue plate) on the landing page only.
import { useRoute } from "vitepress";
import { watchEffect } from "vue";

const route = useRoute();

if (typeof document !== "undefined") {
  watchEffect(() => {
    const { path } = route;
    const normalized = path.replace(/\/$/, "") || "/";
    document.documentElement.classList.toggle("is-home", normalized === "/");
  });
}
</script>

<template>
  <span hidden></span>
</template>
