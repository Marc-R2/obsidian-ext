# remark-ofm

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fremark-ofm)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fremark-ofm)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fremark-ofm)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[remark](https://github.com/remarkjs/remark) plugin to support OFM (callouts, tags, wikilinks).

## What is this?

This package is a [unified](https://github.com/unifiedjs/unified)([remark](https://github.com/remarkjs/remark)) plugin to enable the extensions to markdown that Obsidian adds with OFM.
You can use this plugin to add support for parsing and serializing them.
For full support you should combine it with other packages like ['remark-gfm'](https://github.com/remarkjs/remark-gfm).

## When to use this

This project is useful if you want to support OFM in your markdown.

If you just want to turn markdown into HTML (with maybe a few extensions such as GFM), we recommend [`micromark`](https://github.com/micromark/micromark) with [`micromark-extension-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm) instead.

If you don’t use plugins and want to access the syntax tree, you can use [`mdast-util-from-markdown`](https://github.com/syntax-tree/mdast-util-from-markdown) with [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm).

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/remark-ofm
```

## Use

```js
import remarkOfm from "@moritzrs/remark-ofm";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

const file = await unified()
	.use(remarkParse)
	.use(remarkOfm)
	.use(remarkStringify)
	.process("> [!info]+ Hey There\n> #tag\n> [[link]]");

console.log(String(file));
```

Yields

```md
> [!info]+ Hey There
> #tag
> [[link]]
```

## API

This package exports no identifiers. The default export is `remarkOfm`.

### `unified.use(remarkOfm)`

Add support for OFM (callouts, tags, wikilinks).

###### Parameters

-   `none`

###### Returns

Nothing (`undefined`).

## Compatibility

This package was tested to work with node version `18` and later.

## Related

-   [`micromark-extension-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm) - support for all of OFM in micromark
-   [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) - support for all of OFM in mdast

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
