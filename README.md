# ![obsidian-ext](https://github.com/MoritzRS/obsidian-ext/raw/refs/heads/main/logo.svg)

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

Extensions and utilities regarding Obsidian Flavored Markdown (OFM) and the [Obsidian.md](https://obsidian.md) ecosystem.

## Feature Highlights

-   [x] robust (tested, 100% coverage, fully typed)
-   [x] small (minimal dependencies)
-   [x] obsidian flavored markdown (Callouts, Tags, Wikilinks)
-   [x] json canvas (validate, parse, transform)

## When should I use this?

-   If you want to parse or transform Obsidian Flavored Markdown (OFM)
-   If you want to work with JSON Canvas
-   If you want to work with files from your Obsidian vault

## What is this?

This repository started out as simple extensions to [micromark](https://github.com/micromark/micromark), [mdast](https://github.com/syntax-tree/mdast) and [remark](https://github.com/remarkjs/remark) to support Obsidian Flavored Markdown (OFM).
I started this project because I was not satisfied with the existing solutions for parsing and transforming OFM.
Solutions like [quartz](https://github.com/jackyzha0/quartz) did already support OFM, but I disliked their regex based approach.
While working on it, I also realized problems in the way Obsidian itself parses markdown (especially whitespaces in wikilinks) which lead me to create my own set of extensions to micromark and mdast.
After a short while I also wanted to work with the JSON Canvas format, so I added utilities for that as well.

## Contents

#### Markdown

-   [remark-ofm](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm)
-   [mdast-util-ofm](https://github.com/MoritzRS/obsidian-ext/tree/main/packages//mdast-util-ofm)
-   [mdast-util-ofm-callout](https://github.com/MoritzRS/obsidian-ext/tree/main/packages//mdast-util-ofm-callout)
-   [mdast-util-ofm-tag](https://github.com/MoritzRS/obsidian-ext/tree/main/packages//mdast-util-ofm-tag)
-   [mdast-util-ofm-wikilink](https://github.com/MoritzRS/obsidian-ext/tree/main/packages//mdast-util-ofm-wikilink)
-   [micromark-extension-ofm](https://github.com/MoritzRS/obsidian-ext/tree/main/packages//micromark-extension-ofm)
-   [micromark-extension-ofm-callout](https://github.com/MoritzRS/obsidian-ext/tree/main/packages//micromark-extension-ofm-callout)
-   [micromark-extension-ofm-tag](https://github.com/MoritzRS/obsidian-ext/tree/main/packages//micromark-extension-ofm-tag)
-   [micromark-extension-ofm-wikilink](https://github.com/MoritzRS/obsidian-ext/tree/main/packages//micromark-extension-ofm-wikilink)

#### JSON Canvas

-   [jsoncanvas](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jsoncanvas)
-   [jcast](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast)
-   [jcast-util-from-json](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast-util-from-json)
-   [jcast-util-to-json](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast-util-to-json)

## In Progress / Planned

-   [ ] Add more tests
-   [ ] Add mdast utility to resolve links
-   [ ] Add support for [OFM Comments](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Comments)
-   [ ] Add support for [OFM Blocks](https://help.obsidian.md/Linking+notes+and+files/Internal+links#Link+to+a+block+in+a+note)
-   [ ] Add support for [mdast-util-to-hast](https://github.com/syntax-tree/mdast-util-to-hast)
-   [ ] Add mdast utility to transform OFM to GFM (Github Flavored Markdown) and other formats
-   [ ] Add more utilities for jsoncanvas (e.g. to transform to other formats)
-   [ ] Add Codemirror language extensions
-   [ ] Add CLI (analyze/check/convert content)
-   [ ] Add web exporter

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
