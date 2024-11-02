import { suite, test, expect } from "vitest";
import { removePosition } from "unist-util-remove-position";
import { ofmWikilinkFromMarkdown, ofmWikilinkToMarkdown } from "../src/index.js";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { ofmWikilink } from "@moritzrs/micromark-extension-ofm-wikilink";

suite("mdast-util-ofm-wikilink", () => {
	test("ofmWikilinkFromMarkdown", () => {
		const tree = fromMarkdown(
			"a [[link]] [[link.md]] [[link#hash]] [[link#hash|alias]] ![[link]] ![[link.md]] ![[link#hash]] ![[link#hash|alias]] b",
			{
				extensions: [ofmWikilink()],
				mdastExtensions: [ofmWikilinkFromMarkdown()],
			},
		);

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "a " },
						{ type: "ofmWikilink", value: "link", url: "link", hash: "" },
						{ type: "text", value: " " },
						{ type: "ofmWikilink", value: "link", url: "link.md", hash: "" },
						{ type: "text", value: " " },
						{ type: "ofmWikilink", value: "link", url: "link", hash: "hash" },
						{ type: "text", value: " " },
						{ type: "ofmWikilink", value: "alias", url: "link", hash: "hash" },
						{ type: "text", value: " " },
						{ type: "ofmWikiembedding", value: "link", url: "link", hash: "" },
						{ type: "text", value: " " },
						{ type: "ofmWikiembedding", value: "link", url: "link.md", hash: "" },
						{ type: "text", value: " " },
						{ type: "ofmWikiembedding", value: "link", url: "link", hash: "hash" },
						{ type: "text", value: " " },
						{ type: "ofmWikiembedding", value: "alias", url: "link", hash: "hash" },
						{ type: "text", value: " b" },
					],
				},
			],
		});
	});

	test("ofmWikilinkToMarkdown", () => {
		const markdown = toMarkdown(
			{
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "a " },
							{ type: "ofmWikilink", value: "link", url: "link", hash: "" },
							{ type: "text", value: " " },
							{ type: "ofmWikilink", value: "link", url: "link.md", hash: "" },
							{ type: "text", value: " " },
							{ type: "ofmWikilink", value: "link", url: "link", hash: "hash" },
							{ type: "text", value: " " },
							{ type: "ofmWikilink", value: "alias", url: "link", hash: "hash" },
							{ type: "text", value: " " },
							{ type: "ofmWikiembedding", value: "link", url: "link", hash: "" },
							{ type: "text", value: " " },
							{ type: "ofmWikiembedding", value: "link", url: "link.md", hash: "" },
							{ type: "text", value: " " },
							{ type: "ofmWikiembedding", value: "link", url: "link", hash: "hash" },
							{ type: "text", value: " " },
							{ type: "ofmWikiembedding", value: "alias", url: "link", hash: "hash" },
							{ type: "text", value: " b" },
						],
					},
				],
			},
			{ extensions: [ofmWikilinkToMarkdown()] },
		);

		expect(markdown).toEqual(
			"a [[link]] [[link.md]] [[link#hash]] [[link#hash|alias]] ![[link]] ![[link.md]] ![[link#hash]] ![[link#hash|alias]] b\n",
		);
	});
});
