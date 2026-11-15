# 変更履歴

## 0.1.0

- Sedum Note のドキュメントの `pages/.vitepress/docs-template/` を、このリポジトリへ移しました。
- 設定（`@aida0710/app-docs-theme/config` の `defineDocsConfig`）、テーマ（`@aida0710/app-docs-theme/theme`）、トップのページの部品（`<DocsHome />`）と、その中身の型（`@aida0710/app-docs-theme/home-content`）を配ります。
- 角の丸めは 8px（箱）と 4px（小さな部品）の 2 段です。表は `div.docs-table` に包みます。書体は Noto Sans JP です。
- GitHub Release に添付した tarball で配ります（npm の registry には出しません）。
