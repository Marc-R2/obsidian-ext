# micromark-extension-ofm

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fmicromark-extension-ofm)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fmicromark-extension-ofm)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fmicromark-extension-ofm)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[micromark](https://github.com/micromark/micromark) extensions to support Obsidian Flavored Markdown (OFM).

## What is this?

This package contains extensions that add support for all features enabled by OFM to [`micromark`](https://github.com/micromark/micromark).
It supports callouts, tags as well as wikilinks and embeddings.

## When to use this

This project is useful if you want to support OFM in your markdown.

You can use these extensions when you are working with [`micromark`](https://github.com/micromark/micromark).
Alternatively, you can also use the underlying features separately:

-   [`micromark-extension-ofm-callout`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-callout) - support for OFM callouts
-   [`micromark-extension-ofm-tag`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-tag) - support for OFM tags
-   [`micromark-extension-ofm-wikilink`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-wikilink) - support for OFM wikilinks

When you need a syntax tree, combine this package with [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm).

All these packages are used in [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm), which focuses on making it easier to transform content by abstracting these internals away.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/micromark-extension-ofm
```

## Use

```js
import { micromark } from "micromark";
import { ofm, ofmHtml } from "@moritzrs/micromark-extension-ofm";

const output = micromark("> [!info]+ Hey There\n> #tag\n> [[link]]", {
	extensions: [ofm()],
	htmlExtensions: [ofmHtml()],
});

console.log(output);
```

Yields:

<!-- prettier-ignore -->
```html
<blockquote class="callout" data-type="info">
<details open="">
<summary>Hey There</summary>
<p><span class="tag">tag</span>
<a href="link">link</a></p>
</details>
</blockquote>
```

## API

This package exports the identifiers `ofm` and `ofmHtml`.
There is no default export.

### `ofmTag()`

Creates an extension for `micromark` to enable OFM syntax.

###### Parameters

-   `none`

###### Returns

Extension for `micromark` that can be passed in `extensions`, to enable OFM syntax ([`Extension`](https://github.com/micromark/micromark#syntaxextension)).

### `ofmHtml()`

Creates an extension for `micromark` to support OFM when serializing to HTML.

###### Parameters

-   `none`

###### Returns

Extension for `micromark` that can be passed in `htmlExtensions`, to support OFM when serializing to HTML ([`HtmlExtension`](https://github.com/micromark/micromark#htmlextension)).

## More Information

For more information, look at the individual packages:

-   [`micromark-extension-ofm-callout`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-callout) - support for OFM callouts
-   [`micromark-extension-ofm-tag`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-tag) - support for OFM tags
-   [`micromark-extension-ofm-wikilink`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-wikilink) - support for OFM wikilinks

## Compatibility

This package was tested to work with `micromark` version `4` and later with node version `18` and later.

## Security

This package is safe.

## Related

-   [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) - support for all of OFM in mdast
-   [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) - support for all of OFM in remark

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
