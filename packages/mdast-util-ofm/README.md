# mdast-util-ofm

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fmdast-util-ofm)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fmdast-util-ofm)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fmdast-util-ofm)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[mdast](https://github.com/syntax-tree/mdast) extensions to parse and serialize Obsidian Flavored Markdown (OFM).

## What is this?

This package contains two extensions to add support for OFM tag syntax to [`mdast`](https://github.com/syntax-tree/mdast).
It supports callouts, tags as well as wikilinks and embeddings.

## When to use this

This project is useful if you want to support OFM in your markdown.

You can use these extension when you are working with `mdast-util-from-markdown` and `mdast-util-to-markdown` already.

When working with `mdast-util-from-markdown`, you must combine this package with [`micromark-extension-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm).

When you don't need a syntax tree, you can use [`micromark`](https://github.com/micromark/micromark) directly with `micromark-extension-ofm`.

Alternatively you can also use the underlying features separately:

-   [`mdast-util-ofm-callout`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm-callout) - support for OFM callouts
-   [`mdast-util-ofm-tag`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm-tag) - support for OFM tags
-   [`mdast-util-ofm-wikilink`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm-wikilink) - support for OFM wikilinks

All these packages are used in [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm), which focusses on making it easier to transform content by abstracting these internal away.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/mdast-util-ofm
```

## Use

```js
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { ofm } from "@moritzrs/micromark-extension-ofm";
import { ofmFromMarkdown, ofmToMarkdown } from "@moritzrs/mdast-util-ofm";

const tree = fromMarkdown("> [!info]+ Hey There\n> #tag\n> [[link]]", {
	extensions: [ofm()],
	mdastExtensions: [ofmFromMarkdown()],
});

console.log(tree);

const out = toMarkdown(tree, { extensions: [ofmToMarkdown()] });

console.log(out);
```

Yields

```js
{
	type: "root",
	children: [
		{
			type: "ofmCallout",
			kind: "info",
			folded: false,
			title: "Hey There",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ofmTag",
							value: "tag",
						},
						{
							type: "text",
							value: "\n",
						},
						{
							type: "ofmWikilink",
							url: "link",
							hash: "",
							value: "link",
						},
					],
				},
			],
		},
	],
}
```

```md
This is a #tag.
```

## API

This package exports the identifiers `ofmFromMarkdown` and `ofmToMarkdown`.
There is no default export.

### `ofmFromMarkdown()`

Creates an extension for `mdast-util-from-markdown` to enable OFM in markdown.

###### Parameters

-   `none`

###### Returns

Extension for `mdast-util-from-markdown` that can be passed in `extensions`, to enable OFM syntax ([`FromMarkdownExtension`](https://github.com/syntax-tree/mdast-util-from-markdown#extension)).

### `ofmToMarkdown()`

Creates an extension for `mdast-util-to-markdown` to enable OFM in markdown.

###### Parameters

-   `none`

###### Returns

Extension for `mdast-util-to-markdown` that can be passed in `extensions`, to support OFM when serializing to markdown ([`ToMarkdownExtension`](https://github.com/syntax-tree/mdast-util-to-markdown#options)).

## More Information

For more information, look at the individual packages:

-   [`mdast-util-ofm-callout`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm-callout) - support for OFM callouts
-   [`mdast-util-ofm-tag`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm-tag) - support for OFM tags
-   [`mdast-util-ofm-wikilink`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm-wikilink) - support for OFM wikilinks

## Compatibility

This package was tested to work with node version `18` and later.

## Related

-   [`micromark-extension-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm) - support for all of OFM in micromark
-   [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) - support for all of OFM in remark

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
