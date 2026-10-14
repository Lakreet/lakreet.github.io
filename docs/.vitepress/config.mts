import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Lakreet",
  description: "Small, focused tools for open-source creative software.",
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ["**/README.md"],
  sitemap: { hostname: "https://lakreet.github.io" },
  head: [
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Lakreet" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Small, focused tools for open-source creative software.",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://lakreet.github.io/og-image.png",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
  ],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Plugins", link: "/plugins/" },
      {
        text: "Docs",
        items: [{ text: "lakreet-swarm", link: "/swarm/" }],
      },
      { text: "Community", link: "/community/contributing" },
    ],
    sidebar: {
      "/swarm/": [
        {
          text: "Learn",
          items: [
            { text: "Your first batch", link: "/swarm/learn/first-batch" },
            { text: "Make a template", link: "/swarm/learn/make-a-template" },
            {
              text: "Personalized videos",
              link: "/swarm/learn/personalized-videos",
            },
          ],
        },
        {
          text: "Guides",
          items: [
            { text: "Install", link: "/swarm/guides/install" },
            { text: "Prepare a CSV", link: "/swarm/guides/data-csv" },
            { text: "Use JSON or JSONL", link: "/swarm/guides/data-json" },
            { text: "Map columns", link: "/swarm/guides/map-columns" },
            { text: "Validate first", link: "/swarm/guides/validate-first" },
            { text: "Preview", link: "/swarm/guides/preview" },
            { text: "Resume a batch", link: "/swarm/guides/resume-batches" },
            {
              text: "Retries and timeouts",
              link: "/swarm/guides/retries-and-timeouts",
            },
            { text: "Choose output", link: "/swarm/guides/choose-output" },
            { text: "Use in CI", link: "/swarm/guides/use-in-ci" },
            { text: "Troubleshoot", link: "/swarm/guides/troubleshoot" },
            { text: "Images, GIFs and footage", link: "/swarm/guides/media" },
          ],
        },
        {
          text: "Reference",
          items: [
            { text: "CLI", link: "/swarm/reference/cli/" },
            { text: "Configuration", link: "/swarm/reference/config" },
            { text: "Data formats", link: "/swarm/reference/data-formats" },
            { text: "Control types", link: "/swarm/reference/control-types" },
            {
              text: "Naming patterns",
              link: "/swarm/reference/naming-patterns",
            },
            { text: "Row selection", link: "/swarm/reference/selection" },
            { text: "Exit codes", link: "/swarm/reference/exit-codes" },
            { text: "Errors", link: "/swarm/reference/errors" },
            { text: "Report schema", link: "/swarm/reference/report-schema" },
            { text: "Environment", link: "/swarm/reference/environment" },
            { text: "Compatibility", link: "/swarm/reference/compatibility" },
            { text: "Changelog", link: "/swarm/reference/changelog" },
          ],
        },
        {
          text: "Concepts",
          items: [
            { text: "How it works", link: "/swarm/concepts/how-it-works" },
            { text: "Templates", link: "/swarm/concepts/templates" },
            { text: "Validation", link: "/swarm/concepts/validation" },
            { text: "Performance", link: "/swarm/concepts/performance" },
            { text: "Security", link: "/swarm/concepts/security" },
            { text: "Limitations", link: "/swarm/concepts/limitations" },
            { text: "Unofficial project", link: "/swarm/concepts/unofficial" },
            { text: "Roadmap", link: "/swarm/concepts/roadmap" },
          ],
        },
        {
          text: "Recipes",
          items: [
            { text: "Greeting videos", link: "/swarm/recipes/greeting-videos" },
            { text: "Product promo", link: "/swarm/recipes/product-promo" },
            { text: "Certificates", link: "/swarm/recipes/certificates" },
            { text: "Scoreboard", link: "/swarm/recipes/scoreboard" },
            { text: "Lower thirds", link: "/swarm/recipes/lower-thirds" },
            { text: "Social sizes", link: "/swarm/recipes/social-sizes" },
          ],
        },
        {
          text: "Tools",
          items: [
            { text: "CSV generator", link: "/swarm/tools/csv-generator" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Lakreet" }],
    search: { provider: "local" },
    editLink: {
      pattern:
        "https://github.com/Lakreet/lakreet.github.io/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message:
        "Independent project. Not affiliated with the ArtCraft team or the EffectCraft project.",
    },
  },
  // Temporarily ignore dead links while we create all pages
  ignoreDeadLinks: true,
});
