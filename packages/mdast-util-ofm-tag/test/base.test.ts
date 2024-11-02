import { suite, test, expect } from "vitest";
import { removePosition } from "unist-util-remove-position";
import { ofmTagFromMarkdown, ofmTagToMarkdown } from "../src/index";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { ofmTag } from "@moritzrs/micromark-extension-ofm-tag";

suite("mdast-util-ofm-tag", async () => {
	test("ofmTagFromMarkdown", () => {
		const tree = fromMarkdown("a #b c", {
			extensions: [ofmTag()],
			mdastExtensions: [ofmTagFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "a " },
						{ type: "ofmTag", value: "b" },
						{ type: "text", value: " c" },
					],
				},
			],
		});
	});

	test("ofmTagToMarkdown", () => {
		const markdown = toMarkdown(
			{
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "a " },
							{ type: "ofmTag", value: "b" },
							{ type: "text", value: " c" },
						],
					},
				],
			},
			{ extensions: [ofmTagToMarkdown()] },
		);

		expect(markdown).toEqual("a #b c\n");
	});
});
