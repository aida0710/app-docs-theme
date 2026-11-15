// defineDocsConfig が、製品から渡した中身を VitePress の設定のどこへ入れるかを確かめる。
// dist/config.js を読むので、npm test は先に組み立てる。
import assert from "node:assert/strict";
import { test } from "node:test";
import { createMarkdownRenderer } from "vitepress";
import { defineDocsConfig } from "../dist/config.js";

const site = {
  name: "Example App",
  description: "説明",
  repository: "https://github.com/example/example-app",
  base: "/example-app/",
  siteUrl: "https://example.github.io/example-app/",
  ogImage: "/images/screen.webp",
  logo: "/logo.svg",
  favicon: { path: "/logo.svg", type: "image/svg+xml" },
  themeColor: "#2f7d54",
  nav: [{ text: "はじめる", link: "/guide/" }],
  sidebar: [{ text: "はじめる", items: [{ text: "はじめる", link: "/guide/" }] }],
  footer: { copyright: "Copyright © example" },
};

test("英語の中身を渡さないと、日本語のサイトだけになる", () => {
  const config = defineDocsConfig(site);
  assert.deepEqual(Object.keys(config.locales), ["root"]);
  assert.equal(config.locales.root.lang, "ja");
  assert.equal(config.locales.root.themeConfig.editLink.pattern, "https://github.com/example/example-app/edit/main/pages/:path");
});

test("英語の中身を渡すと、/en/ に英語のサイトを置く", () => {
  const config = defineDocsConfig({ ...site, english: { description: "English", nav: [], sidebar: [] } });
  assert.equal(config.locales.en.link, "/en/");
  assert.equal(config.locales.en.themeConfig.editLink.text, "Edit this page");
});

test("SNS の画像とファビコンを、公開した URL と base から書く", () => {
  const config = defineDocsConfig(site);
  const ogImage = config.head.find(([tag, attributes]) => tag === "meta" && attributes.property === "og:image");
  assert.equal(ogImage[1].content, "https://example.github.io/example-app/images/screen.webp");
  const icon = config.head.find(([tag]) => tag === "link");
  assert.equal(icon[1].href, "/example-app/logo.svg");
});

test("テーマのパッケージを、製品の側の Vite に組み立てさせる", () => {
  const config = defineDocsConfig(site);
  assert.ok(config.vite.ssr.noExternal.includes("@aida0710/app-docs-theme"));
  assert.ok(config.vite.optimizeDeps.exclude.includes("@aida0710/app-docs-theme"));
});

test("表を div.docs-table で包み、製品の Markdown の書き方も足せる", async () => {
  let productRuleRan = false;
  const config = defineDocsConfig({ ...site, markdown: () => { productRuleRan = true; } });
  const md = await createMarkdownRenderer(process.cwd(), config.markdown);
  const html = md.render("| a | b |\n|-|-|\n| 1 | 2 |\n");
  assert.match(html, /^<div class="docs-table"><table>/);
  assert.match(html, /<\/table>\n?<\/div>/);
  assert.ok(productRuleRan);
});
