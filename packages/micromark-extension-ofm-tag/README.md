# micromark-extension-ofm-tag

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fmicromark-extension-ofm-tag)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fmicromark-extension-ofm-tag)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fmicromark-extension-ofm-tag)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[micromark](https://github.com/micromark/micromark) extensions to support Obsidian Flavored Markdown (OFM) [tags](https://help.obsidian.md/Editing+and+formatting/Tags).

## What is this?

This package contains two extensions to add support for OFM tag syntax to [`micromark`](https://github.com/micromark/micromark).

As there is no formal specification, this extensions follows the behavior explained in the [Obsidian help](https://help.obsidian.md/Editing+and+formatting/Tags).

## When to use this

This project is useful if you want to support OFM tags in your markdown.

You can use these extensions when you are working with [`micromark`](https://github.com/micromark/micromark).
To support all OFM features use [`micromark-extension-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm).

All theses packages are used in [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) which focusses on making it easier to transform content by abstracting these internals away.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/micromark-extension-ofm-tag
```

## Use

```js
import { micromark } from "micromark";
import { ofmTag, ofmTagHtml } from "@moritzrs/micromark-extension-ofm-tag";

const output = micromark("This is a #tag.", {
	extensions: [ofmTag()],
	htmlExtensions: [ofmTagHtml()],
});

console.log(output);
```

Yields:

```html
<p>This is a <span class="tag">#tag</span>.</p>
```

## API

This package exports the identifiers `ofmTag` and `ofmTagHtml`.
There is no default export.

### `ofmTag()`

Creates an extension for `micromark` to enable OFM tag syntax.

###### Parameters

-   `none`

###### Returns

Extension for `micromark` that can be passed in `extensions`, to enable OFM tag syntax ([`Extension`](https://github.com/micromark/micromark#syntaxextension)).

### `ofmTagHtml()`

Creates an extension for `micromark` to support OFM tags when serializing to HTML.

###### Parameters

-   `none`

###### Returns

Extension for `micromark` that can be passed in `htmlExtensions`, to support OFM tags when serializing to HTML ([`HtmlExtension`](https://github.com/micromark/micromark#htmlextension)).

## Authoring

When authoring markdown with tags, keep in mind that tags don't work in most places.
If not supported they will be treated as plain text.

## HTML

When using tags, the will be expressed as `<span class="tag">tag</span>`.

## CSS

Tags can be styled using the following selector.

```css
span.tag {
	color: #ff00ff;
}
```

## Syntax

Tags are defined as a `#` followed one or more allowed characters which must include at least one non-numeric character.

Tags form with the following BNF:

```bnf
<tag> ::= "#" <tag_content>
<tag_content> ::= <character>* <non_numeric>+ <character>*

<character> ::= <numeric> | <non_numeric>
<numeric> ::= [0-9]
<non_numeric> ::= [a-z] | [A-Z] | "/" | "-" | "_"
```

The above grammar shows that it is possible to have tags like `#/` or `#-` but that does not mean that you should use them in your documents.

## Compatibility

This package was tested to work with `micromark` version `4` and later with node version `18` and later.

## Security

This package is safe.

## Related

-   [`micromark-extension-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm) - support for all of OFM
-   [`mdast-util-ofm-tag`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm-tag) - support for OFM tags in mdast
-   [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) - support for all of OFM in mdast
-   [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) - support for all of OFM in remark

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
