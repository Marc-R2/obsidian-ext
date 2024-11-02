# jcast-util-from-json

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fjcast-util-from-json)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fjcast-util-from-json)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fjcast-util-from-json)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[jcast](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast/) utility to parse JSON Canvas into a jcast syntax tree.

## What is this?

This package contains a utility to parse JSON Canvas into a syntax tree.
The resulting syntax tree can be used to read and manipulate the JSON Canvas.
In contrast to the JSON Canvas Spec, the syntax tree groups elements inside groups together and allows for easier manipulation using the [unist ecosystem](https://github.com/syntax-tree/unist#list-of-utilities).
To serialize the syntax tree back to JSON Canvas, use [`jcast-util-to-json`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast-util-to-json/).

## When to use this

You can use this utility when you want to work with JSON Canvas in a syntax tree.

If you just want to parse JSON Canvas into a type-safe object, use [`jsoncanvas`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jsoncanvas/) instead.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/jcast-util-from-json
```

## Use

```js
import { readFileSync } from "fs";
import { visit } from "unist-util-visit";
import { fromJson } from "@moritzrs/jcast-util-from-json";

const json = readFileSync("Untitled.canvas", "utf-8");
const tree = fromJson(json);

// Print all group labels
visit(tree, "group", (group) => {
	console.log(group.value);
});
```

## API

This package exports only the identifier `fromJson`.
There is no default export.

### `fromJson(json: string): Root`

Parse a JSON Canvas string into a jcast syntax tree.

###### Parameters

-   `json` (`string`) — JSON Canvas string to parse.

###### Returns

JCAST syntax tree representing the JSON Canvas.

## Types

This package utilized the types from the [`jcast`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast/) package.

## Related

-   [`jcast`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast/) - JSON Canvas syntax tree
-   [`jcast-util-to-json`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast-util-to-json/) - JSON Canvas serializer
-   [`jsoncanvas`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jsoncanvas/) - JSON Canvas parser

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
