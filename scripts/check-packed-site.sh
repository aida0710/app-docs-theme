#!/bin/sh
# npm pack した tarball を、リポジトリの外の空のフォルダに入れて、example のサイトを組み立てる。
# 製品と同じ入れ方（tarball への依存）で、設定（dist/config.js）を Node が読めることと、
# テーマの .ts・.vue・.css を製品の側の Vite が組み立てられることを確かめる。
set -eu

root=$(cd "$(dirname "$0")/.." && pwd)
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

cd "$root"
tarball=$(npm pack --silent --pack-destination "$work" | tail -n 1)
vitepress_version=$(node -p 'require("./package.json").devDependencies.vitepress')
vite_version=$(node -p 'require("./package.json").overrides.vite')

cp -R example "$work/site"
cd "$work/site"
rm -rf .vitepress/cache .vitepress/dist
cat > package.json <<JSON
{
  "name": "example-site",
  "private": true,
  "type": "module",
  "overrides": { "vite": "$vite_version" }
}
JSON
npm install --no-audit --no-fund "vitepress@$vitepress_version" "$work/$tarball"

# テーマが vitepress の別の写しを持ち込むと、製品の VitePress と部品が食い違う。
copies=$(npm ls vitepress --all --parseable | wc -l)
if [ "$copies" -ne 1 ]; then
  echo "vitepress が $copies つ入っています" >&2
  npm ls vitepress --all >&2
  exit 1
fi

npx vitepress build

dist=.vitepress/dist
grep -q 'class="docs-home"' "$dist/index.html"
grep -q 'class="docs-feature wide"' "$dist/index.html"
grep -q 'class="docs-command"' "$dist/index.html"
grep -q 'class="docs-table"' "$dist/guide/index.html"
grep -q 'class="docs-home"' "$dist/en/index.html"
grep -q 'このページを編集' "$dist/guide/index.html"
grep -q 'Edit this page' "$dist/en/guide/index.html"
echo "example のサイトを組み立てました（$tarball）"
