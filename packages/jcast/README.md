# jcast

![Build](https://github.com/MoritzRS/obsidian-ext/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/%40moritzrs%2Fjcast)
![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/%40moritzrs%2Fjcast)
![NPM Downloads](https://img.shields.io/npm/dm/%40moritzrs%2Fjcast)
![GitHub License](https://img.shields.io/github/license/MoritzRS/obsidian-ext)

**J**SON **C**anvas **A**bstract **S**yntax **T**ree

## What is this?

**jcast** is a specification for representing [JSON Canvas](https://jsoncanvas.org) in a [syntax tree](https://github.com/syntax-tree/unist#syntax-tree).
It implements [unist](https://github.com/syntax-tree/unist), a format for syntax trees, to benefit its [ecosystem of utilities](https://github.com/syntax-tree/unist#list-of-utilities).

## When to use this

In most cases you will not need to use this package directly.
It is used internally by [`jcast-util-from-json`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast-util-from-json/) and [`jcast-util-to-json`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast-util-to-json/) to convert between JSON Canvas and jcast.

## Related

-   [`jcast-util-from-json`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast-util-from-json/) - Utility to parse JSON Canvas into a jcast syntax tree.
-   [`jcast-util-to-json`](https://github.com/MoritzRS/obsidian-ext/tree/main/packages/jcast-util-to-json/) - Utility to serialize a jcast syntax tree into JSON Canvas.

## Contribute

I don't know if i can check PRs in a timely manner, but feel free to open PRs or issues.
If participation is high I will need to add a code of conduct and contribution guidelines.

## Disclaimer

This package is not affiliated with Obsidian.md or the developers of Obsidian.md.

## License

[MIT](https://github.com/MoritzRS/obsidian-ext/blob/main/LICENSE.md) © Moritz R. Schulz
