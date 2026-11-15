// テーマの確かめ用のサイト。scripts/check-packed-site.sh が、npm pack した tarball を入れた別のフォルダで組み立てる。
import { defineDocsConfig } from "@aida0710/app-docs-theme/config";

export default defineDocsConfig({
  name: "Example App",
  description: "テーマの確かめ用のサイト",
  repository: "https://github.com/aida0710/app-docs-theme",
  base: process.env.DOCS_BASE ?? "/app-docs-theme/",
  siteUrl: "https://aida0710.github.io/app-docs-theme/",
  ogImage: "/images/screen.svg",
  logo: "/logo.svg",
  favicon: { path: "/logo.svg", type: "image/svg+xml" },
  themeColor: "#2f7d54",
  nav: [{ text: "はじめる", link: "/guide/" }],
  sidebar: [{ text: "はじめる", items: [{ text: "部品の一覧", link: "/guide/" }] }],
  footer: { message: "Apache License 2.0", copyright: "Copyright © example" },
  english: {
    description: "A site for checking the theme",
    nav: [{ text: "Guide", link: "/en/guide/" }],
    sidebar: [{ text: "Guide", items: [{ text: "Components", link: "/en/guide/" }] }],
  },
  markdown: (md) => {
    // 製品だけの書き方を足せることを確かめる。
    md.core.ruler.push("example_marker", (state) => {
      state.env.exampleMarker = true;
      return false;
    });
  },
});
