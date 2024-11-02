# jsoncanvas

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fjsoncanvas)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fjsoncanvas)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fjsoncanvas)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

Fully typed schema for JSON Canvas.

## What is this?

This package defines the types described in the [JSON Canvas specification](https://jsoncanvas.org/spec/1.0).

It also provides a simple function to parse a source string into a JSON Canvas document.

## When to use this

This project is useful if you want to read in JSON Canvas documents and work with them in a type-safe way.

It does nothing but checking if an input string contains a valid JSON Canvas document and returns it as a fully typed object.

## Install

This package is ESM only. In Node.js (version 18+), install with `npm`:

```sh
npm install @moritzrs/jsoncanvas
```

## Use

```js
import { readFileSync } from "fs";
import { jsonCanvas } from "@moritzrs/jsoncanvas";

const source = readFileSync("example.canvas", "utf8");
const canvas = jsonCanvas(source);
```

## API

This package exports only the `jsonCanvas` function, as well as the types described in the JSON Canvas specification.

### `jsonCanvas(source: string): Canvas`

Parse a JSON Canvas document from a string.
Throws an error if the source string is not a valid JSON Canvas document.

###### Parameters

-   `source` (`string`) — The source string to parse.

###### Returns

A fully typed JSON Canvas document.

## Compatibility

This package was tested to work with node version `18` and later.

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
