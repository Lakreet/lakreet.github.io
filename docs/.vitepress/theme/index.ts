import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import PluginIndex from "./components/PluginIndex.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("PluginIndex", PluginIndex);
  },
} satisfies Theme;