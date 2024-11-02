# jcast-util-to-json

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fjcast-util-to-json)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fjcast-util-to-json)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fjcast-util-to-json)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

[jcast](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast/) utility to parse jcast syntax tree back into JSON Canvas.

## What is this?

This package contains a utility to parse a jcast syntax tree back into a JSON Canvas string.
The resulting string can be written to a file and used directly in Obsidian.md.

## When to use this

You can use this utility when you want to serialize a modified jcast syntax tree back to jsoncanvas.

If you just want to parse JSON Canvas into a type-safe object, use [`jsoncanvas`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jsoncanvas/) instead.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/jcast-util-to-json
```

## Use

```js
import { readFileSync, writeFileSync } from "fs";
import { visit } from "unist-util-visit";
import { fromJson } from "@moritzrs/jcast-util-from-json";
import { toJson } from "@moritzrs/jcast-util-to-json";

const json = readFileSync("Untitled.canvas", "utf-8");
const tree = fromJson(json);

// Rename all groups numerically
let counter = 0;
visit(tree, "group", (group) => {
	counter += 1;
	group.value = `Group ${counter}`;
});

const modified = toJson(tree);
writeFileSync("Untitled.canvas", modified);
```

## API

This package exports only the identifier `toJson`.
There is no default export.

### `toJson(tree: Root): string`

Parse a jcast syntax tree back into a JSON Canvas string.
Due to jcast having a different understanding of groups, it recalculates the geometry of group nodes.

###### Parameters

-   `tree: Root` - JCAST syntax tree representing the JSON Canvas.

###### Returns

Serialized JSON Canvas string.

## Types

This package utilized the types from the [`jcast`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast/) package.

## Related

-   [`jcast`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast/) - JSON Canvas syntax tree
-   [`jcast-util-from-json`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast-util-from-json/) - JSON Canvas parser
-   [`jsoncanvas`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jsoncanvas/) - JSON Canvas parser

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
