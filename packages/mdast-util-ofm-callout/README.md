# mdast-util-ofm-callout

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fmdast-util-ofm-callout)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fmdast-util-ofm-callout)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fmdast-util-ofm-callout)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[mdast](https://github.com/syntax-tree/mdast) extensions to parse and serialize Obsidian Flavored Markdown (OFM) [callouts](https://help.obsidian.md/Editing+and+formatting/Callouts).

## What is this?

This package contains two extensions to add support for OFM callout syntax to [`mdast`](https://github.com/syntax-tree/mdast).
These extensions plug into [`mdast-util-from-markdown`](https://github.com/syntax-tree/mdast-util-from-markdown) (to support parsing callouts in markdown into a syntax tree) and [`mdast-util-to-markdown`](https://github.com/syntax-tree/mdast-util-to-markdown) (to support serializing callouts in syntax trees to markdown)

## When to use this

You can use these extension when you are working with `mdast-util-from-markdown` and `mdast-util-to-markdown` already.

When working with `mdast-util-from-markdown`, you must combine this package with [`micromark-extension-ofm-callout`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-callout).

When you don't need a syntax tree, you can use [`micromark`](https://github.com/micromark/micromark) directly with `micromark-extension-ofm-callout`.

When you are working with syntax trees and want all of OFM, use [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) instead.

All these packages are used in [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm), which focusses on making it easier to transform content by abstracting these internal away.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/mdast-util-ofm-callout
```

## Use

```js
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { ofmCallout } from "@moritzrs/micromark-extension-ofm-callout";
import { ofmCalloutFromMarkdown, ofmCalloutToMarkdown } from "@moritzrs/mdast-util-ofm-callout";

const tree = fromMarkdown("> [!info]+ Title\n> Content", {
	extensions: [ofmCallout()],
	mdastExtensions: [ofmCalloutFromMarkdown()],
});

console.log(tree);

const out = toMarkdown(tree, { extensions: [ofmCalloutToMarkdown()] });

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
			title: "Title",
			folded: false,
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "Content",
						},
					],
				},
			],
		},
	],
}
```

```md
> [!info]+ Title
> Content
```

## API

This package exports the identifiers `ofmCalloutFromMarkdown` and `ofmCalloutToMarkdown`.
There is no default export.

### `ofmCalloutFromMarkdown()`

Creates an extension for `mdast-util-from-markdown` to enable OFM callouts in markdown.

###### Parameters

-   `none`

###### Returns

Extension for `mdast-util-from-markdown` that can be passed in `extensions`, to enable OFM callout syntax ([`FromMarkdownExtension`](https://github.com/syntax-tree/mdast-util-from-markdown#extension)).

### `ofmCalloutToMarkdown()`

Creates an extension for `mdast-util-to-markdown` to enable OFM callouts in markdown.

###### Parameters

-   `none`

###### Returns

Extension for `mdast-util-to-markdown` that can be passed in `extensions`, to support OFM callouts when serializing to markdown ([`ToMarkdownExtension`](https://github.com/syntax-tree/mdast-util-to-markdown#options)).

## Syntax

See [Syntax in `micromark-extension-ofm-callout`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-callout#syntax).

## Syntax tree

The following interfaces are added to [mdast](https://github.com/syntax-tree/mdast) by this utility.

### Nodes

#### `OfmCallout`

```idl
interface OfmCallout <: Parent {
	type: "ofmCallout";
	kind: string;
	title: string;
	folded?: boolean;
}
```

**OfmCallout** represents an emphasized block similar to a blockquote.

**OfmCallout** can be used where block content is expected.

For example, the following markdown:

```markdown
> [!info]+ Title
> Content
```

Yields:

```js
{
	type: "ofmCallout";
	kind: "info";
	title: "Title;
	folded?: false;
	children: [
		{
			type: "paragraph",
			children: [
				{
					type: "text",
					value: "Content",
				},
			],
		},
	],
}
```

### Content Model

#### `PhrasingContent` (OFM callout)

```idl
type PhrasingContent = OfmCallout | PhrasingContent;
```

## Types

This package is fully typed with [TypeScript](https://www.typescriptlang.org/).
It does not export additional types.

The `OfmCallout` type of the mdast node is exposed from `@types/mdast`.

## Compatibility

This package was tested to work with node version `18` and later.

## Related

-   [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) - remark plugin to support OFM
-   [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) - mdast extension to parse and serialize OFM
-   [`micromark-extension-ofm-callout`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-callout) - micromark extension to parse OFM callouts

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
