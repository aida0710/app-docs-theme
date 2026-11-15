---
layout: home
title: Example App
description: テーマの確かめ用のサイト
sidebar: false
outline: false
docsHome:
  name: Example App
  lead: テーマの確かめ用のサイトです。<code>docsHome</code> の項目を全部使っています。
  platforms: { label: 対応OS, text: macOS / Windows / Linux }
  actions:
    - { text: はじめる, link: /guide/, primary: true }
    - { text: GitHub, link: "https://github.com/aida0710/app-docs-theme" }
  preview: { src: /images/screen.svg, alt: 見本の画面, width: 1280, height: 800 }
  sections:
    - heading: 主な機能
      lead: 広いカードが 2 枚、ふつうのカードが 4 枚です。<a href="./guide/">部品の一覧</a>もあります。
      features:
        - { title: 広いカード, link: /guide/, image: /images/screen.svg, alt: 見本の画面, body: 1 行に 2 枚並びます。, wide: true }
        - { title: リンクの無いカード, image: /images/screen.svg, alt: 見本の画面, body: 題はリンクになりません。, wide: true }
        - { title: カード 3, link: /guide/, image: /images/screen.svg, alt: 見本の画面, body: 1 行に 3 枚並びます。 }
        - { title: カード 4, link: /guide/, image: /images/screen.svg, alt: 見本の画面, body: 説明に <code>コード</code> を入れられます。 }
        - { title: カード 5, link: /guide/, image: /images/screen.svg, alt: 見本の画面, body: 説明の文です。 }
        - { title: カード 6, link: /guide/, image: /images/screen.svg, alt: 見本の画面, body: 説明の文です。 }
    - heading: ほかにできること
      links:
        - '<a href="./guide/">部品の一覧</a>で、表・コード・注記を見る'
        - 短い項目の一覧
    - heading: デモを試す
      lead: 節にボタンだけを置けます。
      actions:
        - { text: デモを開く, link: "https://example.com/", primary: true }
    - heading: インストール
      command: { code: brew install example, label: macOS / Linux }
---

<DocsHome />
