# mdast-util-ofm-wikilink

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fmdast-util-ofm-wikilink)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fmdast-util-ofm-wikilink)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fmdast-util-ofm-wikilink)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[mdast](https://github.com/syntax-tree/mdast) extensions to parse and serialize Obsidian Flavored Markdown (OFM) [wikilinks](https://help.obsidian.md/Linking+notes+and+files/Internal+links) and embeddings.

## What is this?

This package contains two extensions to add support for OFM wikilink syntax to [`mdast`](https://github.com/syntax-tree/mdast).
These extensions plug into [`mdast-util-from-markdown`](https://github.com/syntax-tree/mdast-util-from-markdown) (to support parsing wikilinks in markdown into a syntax tree) and [`mdast-util-to-markdown`](https://github.com/syntax-tree/mdast-util-to-markdown) (to support serializing wikilinks in syntax trees to markdown)

## When to use this

You can use these extension when you are working with `mdast-util-from-markdown` and `mdast-util-to-markdown` already.

When working with `mdast-util-from-markdown`, you must combine this package with [`micromark-extension-ofm-wikilink`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-wikilink).

When you don't need a syntax tree, you can use [`micromark`](https://github.com/micromark/micromark) directly with `micromark-extension-ofm-wikilink`.

When you are working with syntax trees and want all of OFM, use [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) instead.

All these packages are used in [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm), which focusses on making it easier to transform content by abstracting these internal away.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/mdast-util-ofm-wikilink
```

## Use

```js
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { ofmWikilink } from "@moritzrs/micromark-extension-ofm-wikilink";
import { ofmWikilinkFromMarkdown, ofmWikilinkToMarkdown } from "@moritzrs/mdast-util-ofm-wikilink";

const tree = fromMarkdown("This is a [[link]].", {
	extensions: [ofmWikilink()],
	mdastExtensions: [ofmWikilinkFromMarkdown()],
});

console.log(tree);

const out = toMarkdown(tree, { extensions: [ofmWikilinkToMarkdown()] });

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
				{ type: "ofmWikilink", value: "link", url: "link", hash: "" },
				{ type: "text", value: "." },
			],
		},
	]
}
```

```md
This is a [[link]].
```

## API

This package exports the identifiers `ofmWikilinkFromMarkdown` and `ofmWikilinkToMarkdown`.
There is no default export.

### `ofmWikilinkFromMarkdown()`

Creates an extension for `mdast-util-from-markdown` to enable OFM wikilink in markdown.

###### Parameters

-   `none`

###### Returns

Extension for `mdast-util-from-markdown` that can be passed in `extensions`, to enable OFM wikilink syntax ([`FromMarkdownExtension`](https://github.com/syntax-tree/mdast-util-from-markdown#extension)).

### `ofmWikilinkToMarkdown()`

Creates an extension for `mdast-util-to-markdown` to enable OFM wikilink in markdown.

###### Parameters

-   `none`

###### Returns

Extension for `mdast-util-to-markdown` that can be passed in `extensions`, to support OFM wikilinks when serializing to markdown ([`ToMarkdownExtension`](https://github.com/syntax-tree/mdast-util-to-markdown#options)).

## Syntax

See [Syntax in `micromark-extension-ofm-wikilink`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-wikilink#syntax).

## Syntax tree

The following interfaces are added to [mdast](https://github.com/syntax-tree/mdast) by this utility.

### Nodes

#### `OfmWikilink`

```idl
interface OfmWikilink <: Literal {
	type: "ofmWikilink";
	url: string;
	hash: string;
	value: string;
}
```

**OfmWikilink** represents an internal link.

**OfmWikilink** can be used where phrasing content is expected.

For example, the following markdown:

```markdown
[[link]]
```

Yields:

```js
{
	type: "ofmWikilink",
	url: "link",
	hash: "",
	value: "link",
}
```

#### `OfmWikiEmbedding`

```idl
interface OfmWikiEmbedding <: Literal {
	type: "ofmWikilink";
	url: string;
	hash: string;
	value: string;
}
```

**OfmWikiEmbedding** represents an embedded internal file.

**OfmWikiEmbedding** can be used where phrasing content is expected.

For example, the following markdown:

```markdown
![[link]]
```

Yields:

```js
{
	type: "ofmWikiembedding"
	url: "link",
	hash: "",
	value: "link",
}
```

### Content Model

#### `PhrasingContent` (OFM wikilink)

```idl
type PhrasingContent = OfmWikilink | OfmWikiEmbedding | PhrasingContent;
```

## Types

This package is fully typed with [TypeScript](https://www.typescriptlang.org/).
It does not export additional types.

The `OfmWikilink` and `OfmWikiEmbedding` types of the mdast node are exposed from `@types/mdast`.

## Compatibility

This package was tested to work with node version `18` and later.

## Related

-   [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) - remark plugin to support OFM
-   [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) - mdast extension to parse and serialize OFM
-   [`micromark-extension-ofm-wikilink`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm-wikilink) - micromark extension to parse OFM wikilinks

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
