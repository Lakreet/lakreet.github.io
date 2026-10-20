import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import HomeFlag from "./components/HomeFlag.vue";
import PluginIndex from "./components/PluginIndex.vue";
import StatusBadge from "./components/StatusBadge.vue";
import Since from "./components/Since.vue";
import VideoEmbed from "./components/VideoEmbed.vue";
import CompatTable from "./components/CompatTable.vue";
import CsvGenerator from "./components/CsvGenerator.vue";
import "./custom.css";

export default {
  // Wraps the default layout so we can mount route-level UI helpers that
  // need to live at the very top of the page (outside the content area).
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "layout-top": () => h(HomeFlag),
    }),
  enhanceApp({ app }) {
    app.component("PluginIndex", PluginIndex);
    app.component("StatusBadge", StatusBadge);
    app.component("Since", Since);
    app.component("VideoEmbed", VideoEmbed);
    app.component("CompatTable", CompatTable);
    app.component("CsvGenerator", CsvGenerator);
  },
} satisfies Theme;
