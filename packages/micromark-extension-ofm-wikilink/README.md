# micromark-extension-ofm-wikilink

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fmicromark-extension-ofm-wikilink)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fmicromark-extension-ofm-wikilink)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fmicromark-extension-ofm-wikilink)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[micromark](https://github.com/micromark/micromark) extensions to support Obsidian Flavored Markdown (OFM) [wikilinks](https://help.obsidian.md/Linking+notes+and+files/Internal+links) and embeddings.

## What is this?

This package contains two extensions to add support for OFM tag syntax to [`micromark`](https://github.com/micromark/micromark).

As there is no one formal specification, this extensions follows the behavior explained in the [Obsidian help](https://help.obsidian.md/Linking+notes+and+files/Internal+links) but deviates in some places, e.g. in parsing whitespace more like explained in the [Wikipedia](https://en.wikipedia.org/wiki/Help:Link).

## When to use this

This project is useful if you want to support OFM wikilinks or embeddings in your markdown.

You can use these extensions when you are working with [`micromark`](https://github.com/micromark/micromark).
To support all OFM features use [`micromark-extension-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm).

All theses packages are used in [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) which focusses on making it easier to transform content by abstracting these internals away.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/micromark-extension-ofm-wikilink
```

## Use

```js
import { micromark } from "micromark";
import { ofmTag, ofmTagHtml } from "@moritzrs/micromark-extension-ofm-tag";

const output = micromark("This is a [[link]].", {
	extensions: [ofmTag()],
	htmlExtensions: [ofmTagHtml()],
});

console.log(output);
```

Yields:

```html
<p>This is a <a href="link">link</a>.</p>
```

## API

This package exports the identifiers `ofmWikilink` and `ofmWikilinkHtml`.
There is no default export.

### `ofmWikilink()`

Creates an extension for `micromark` to enable OFM wikilink syntax.

###### Parameters

-   `none`

###### Returns

Extension for `micromark` that can be passed in `extensions`, to enable OFM wikilink syntax ([`Extension`](https://github.com/micromark/micromark#syntaxextension)).

### `ofmWikilinkHtml()`

Creates an extension for `micromark` to support OFM wikilinks when serializing to HTML.

###### Parameters

-   `none`

###### Returns

Extension for `micromark` that can be passed in `htmlExtensions`, to support OFM wikilinks and embeddings when serializing to HTML ([`HtmlExtension`](https://github.com/micromark/micromark#htmlextension)).

## Authoring

When authoring markdown with wikilink, keep in mind that wikilinks don't work in most places, and not all implementations behave the same.

While I tried to follow the description in the Obsidian help, there are some differences.
Especially when it comes to whitespace, I opted to follow the Wikipedia description of links, where any prefix or suffix whitespace to links, hashes and aliases is ignored.

## HTML

When using wikilinks, they will be expressed as normal links: `<a href="path#hash">alias</a>`.
Embeddings will be expressed as iframes with fallback links: `<iframe src="path#hash" title="alias"><a href="path#hash">alias</a></iframe>`.

Also links won't be resolved, so you might need to handle that yourself in mdast.

## CSS

Wikilinks can be styled like normal links using the following selector.

```css
a {
	color: #ff00ff;
}
```

## Syntax

In this extension, wikilinks form using the following BNF:

```bnf
<wikilink> ::= "!"? "[[" <space>* <path>? <space>* <hash>? <space>* <alias>? <space>* "]]"

<path> ::= <content>
<hash> ::= "#" <space>* <letters>* <space>*
<alias> ::= "|" <space>* <content>* <space>*

<content> ::= <letters> | <content> <space>+ <content>
<letters> ::= <letter>+

<space> ::= " "
<letter> ::= [a-z] | [A-Z] | [0-9] | "."

```

The above grammar shows that embeddings and wikilinks are both classified as wikilinks.
The differentiation happens at a higher level.

The grammar also allows for more whitespaces than obsidian and strips them when parsing.
This means that `[[  path  |  alias  ]]` is the same as `[[path|alias]]`.

## Compatibility

This package was tested to work with `micromark` version `4` and later with node version `18` and later.

## Security

This package is safe.

## Related

-   [`micromark-extension-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm) - support for all of OFM
-   [`mdast-util-ofm-wikilink`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm-wikilink) - support for OFM wikilinks and embeddings in mdast
-   [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) - support for all of OFM in mdast
-   [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) - support for all of OFM in remark

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
