import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import PluginIndex from "./components/PluginIndex.vue";
import StatusBadge from "./components/StatusBadge.vue";
import Since from "./components/Since.vue";
import VideoEmbed from "./components/VideoEmbed.vue";
import CompatTable from "./components/CompatTable.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("PluginIndex", PluginIndex);
    app.component("StatusBadge", StatusBadge);
    app.component("Since", Since);
    app.component("VideoEmbed", VideoEmbed);
    app.component("CompatTable", CompatTable);
  },
} satisfies Theme;
