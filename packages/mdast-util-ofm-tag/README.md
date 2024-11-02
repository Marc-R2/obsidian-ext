# mdast-util-ofm-tag

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fmdast-util-ofm-tag)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fmdast-util-ofm-tag)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fmdast-util-ofm-tag)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[mdast](https://github.com/syntax-tree/mdast) extensions to parse and serialize Obsidian Flavored Markdown (OFM) [tags](https://help.obsidian.md/Editing+and+formatting/Tags).

## What is this?

This package contains two extensions to add support for OFM tag syntax to [`mdast`](https://github.com/syntax-tree/mdast).
These extensions plug into [`mdast-util-from-markdown`](https://github.com/syntax-tree/mdast-util-from-markdown) (to support parsing tags in markdown into a syntax tree) and [`mdast-util-to-markdown`](https://github.com/syntax-tree/mdast-util-to-markdown) (to support serializing tags in syntax trees to markdown)

## When to use this

You can use these extension when you are working with `mdast-util-from-markdown` and `mdast-util-to-markdown` already.

When working with `mdast-util-from-markdown`, you must combine this package with [`micromark-extension-ofm-tag`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-tag).

When you don't need a syntax tree, you can use [`micromark`](https://github.com/micromark/micromark) directly with `micromark-extension-ofm-tag`.

When you are working with syntax trees and want all of OFM, use [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) instead.

All these packages are used in [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm), which focusses on making it easier to transform content by abstracting these internal away.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/mdast-util-ofm-tag
```

## Use

```js
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { ofmTag } from "@moritzrs/micromark-extension-ofm-tag";
import { ofmTagFromMarkdown, ofmTagToMarkdown } from "@moritzrs/mdast-util-ofm-tag";

const tree = fromMarkdown("This is a #tag.", {
	extensions: [ofmTag()],
	mdastExtensions: [ofmTagFromMarkdown()],
});

console.log(tree);

const out = toMarkdown(tree, { extensions: [ofmTagToMarkdown()] });

console.log(out);
```

Yields

```js
{
	type: "root",
	children: [
		{
			type: "paragraph",
			children: [
				{ type: "text", value: "This is a " },
				{ type: "ofmTag", value: "tag" },
				{ type: "text", value: "." },
			],
		},
	]
}
```

```md
This is a #tag.
```

## API

This package exports the identifiers `ofmTagFromMarkdown` and `ofmTagToMarkdown`.
There is no default export.

### `ofmTagFromMarkdown()`

Creates an extension for `mdast-util-from-markdown` to enable OFM tag in markdown.

###### Parameters

-   `none`

###### Returns

Extension for `mdast-util-from-markdown` that can be passed in `extensions`, to enable OFM tag syntax ([`FromMarkdownExtension`](https://github.com/syntax-tree/mdast-util-from-markdown#extension)).

### `ofmTagToMarkdown()`

Creates an extension for `mdast-util-to-markdown` to enable OFM tag in markdown.

###### Parameters

-   `none`

###### Returns

Extension for `mdast-util-to-markdown` that can be passed in `extensions`, to support OFM tags when serializing to markdown ([`ToMarkdownExtension`](https://github.com/syntax-tree/mdast-util-to-markdown#options)).

## Syntax

See [Syntax in `micromark-extension-ofm-tag`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-tag#syntax).

## Syntax tree

The following interfaces are added to [mdast](https://github.com/syntax-tree/mdast) by this utility.

### Nodes

#### `OfmTag`

```idl
interface OfmTag <: Literal {
	type: "ofmTag";
	value: string;
}
```

**OfmTag** represents a keyword that should be findable in a search.

**OfmTag** can be used where phrasing content is expected.

For example, the following markdown:

```markdown
#tag
```

Yields:

```js
{
	type: "ofmTag",
	value: "tag",
}
```

### Content Model

#### `PhrasingContent` (OFM tag)

```idl
type PhrasingContent = OfmTag | PhrasingContent;
```

## Types

This package is fully typed with [TypeScript](https://www.typescriptlang.org/).
It does not export additional types.

The `OfmTag` type of the mdast node is exposed from `@types/mdast`.

## Compatibility

This package was tested to work with node version `18` and later.

## Related

-   [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) - remark plugin to support OFM
-   [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) - mdast extension to parse and serialize OFM
-   [`micromark-extension-ofm-tag`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-tag) - micromark extension to parse OFM tags

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
