# micromark-extension-ofm-callout

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fmicromark-extension-ofm-callout)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fmicromark-extension-ofm-callout)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fmicromark-extension-ofm-callout)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[micromark](https://github.com/micromark/micromark) extensions to support Obsidian Flavored Markdown (OFM) [callouts](https://help.obsidian.md/Editing+and+formatting/Callouts).

## What is this?

This package contains two extensions to add support for OFM callout syntax to [`micromark`](https://github.com/micromark/micromark).

As there is no formal specification, this extensions follows the behavior explained in the [Obsidian help](https://help.obsidian.md/Editing+and+formatting/Callouts).

## When to use this

This project is useful if you want to support OFM callouts in your markdown.

You can use these extensions when you are working with [`micromark`](https://github.com/micromark/micromark).
To support all OFM features use [`micromark-extension-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm).

All theses packages are used in [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) which focusses on making it easier to transform content by abstracting these internals away.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/micromark-extension-ofm-callout
```

## Use

```js
import { micromark } from "micromark";
import { ofmCallout, ofmCalloutHtml } from "@moritzrs/micromark-extension-ofm-callout";

const output = micromark("> [!type]+ Title\n> Content", {
	extensions: [ofmCallout()],
	htmlExtensions: [ofmCalloutHtml()],
});

console.log(output);
```

Yields:

```html
<blockquote class="callout" data-type="type">
	<details open="">
		<summary>Title</summary>
		<p>Content</p>
	</details>
</blockquote>
```

## API

This package exports the identifiers `ofmCallout` and `ofmCalloutHtml`.
There is no default export.

### `ofmCallout()`

Creates an extension for `micromark` to enable OFM callout syntax.

###### Parameters

-   `none`

###### Returns

Extension for `micromark` that can be passed in `extensions`, to enable OFM callout syntax ([`Extension`](https://github.com/micromark/micromark#syntaxextension)).

### `ofmCalloutHtml()`

Creates an extension for `micromark` to support OFM callouts when serializing to HTML.

###### Parameters

-   `none`

###### Returns

Extension for `micromark` that can be passed in `htmlExtensions`, to support OFM callouts when serializing to HTML ([`HtmlExtension`](https://github.com/micromark/micromark#htmlextension)).

## Authoring

When authoring markdown with callouts, keep in mind that callouts don't work in most places.
If not supported they will be treated as blockquotes and their prefix will be treated as raw text.

## HTML

When using callouts, the will be expressed as following

```html
<blockquote class="callout" data-type="type">
	<details open="">
		<summary>Title</summary>
		<p>Content</p>
	</details>
</blockquote>
```

## CSS

callouts can be styled using the following selector.

```css
blockquote.callout {
	/** General Callout styling */
}

blockquote.callout[data-type="type"] {
	/** Specific Callout type styling */
}

blockquote.callout details {
	/** Content */
}

blockquote.callout details summary {
	/** Title */
}
```

## Syntax

Callouts derive from blockquotes and have a prefix that defines its appearance.

Callouts form with the following BNF:

```bnf
<callout> ::= <prefix> ("\n" <content>)*

<prefix> ::= <space>? ">" <space>? "[" "!" <type> "]" <foldable>? <space> <title>?
<content> ::= <space>? ">" <letter>*

<type> ::= <letter>+ | <type> <space>+
<foldable> ::= "+" | "-"
<title> ::= (<letter> | <space>)+

<letter> ::= [a-z] | [A-Z] | [0-9]
<space> ::= " "
```

The above grammar is just a rough description and misses out some allowed characters and spaces.

## Compatibility

This package was tested to work with `micromark` version `4` and later with node version `18` and later.

## Security

This package is safe.

## Related

-   [`micromark-extension-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/micromark-extension-ofm) - support for all of OFM
-   [`mdast-util-ofm-callout`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm-callout) - support for OFM callouts in mdast
-   [`mdast-util-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/mdast-util-ofm) - support for all of OFM in mdast
-   [`remark-ofm`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/remark-ofm) - support for all of OFM in remark

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
