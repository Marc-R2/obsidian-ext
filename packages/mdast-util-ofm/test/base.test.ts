import { suite, test, expect } from "vitest";
import { removePosition } from "unist-util-remove-position";
import { ofmFromMarkdown, ofmToMarkdown } from "../src/index";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { ofm } from "@moritzrs/micromark-extension-ofm";

suite("mdast-util-ofm", async () => {
	test("ofmFromMarkdown", () => {
		const tree = fromMarkdown("> [!info]+ Hey There\n> #tag\n> [[link]]", {
			extensions: [ofm()],
			mdastExtensions: [ofmFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "ofmCallout",
					kind: "info",
					folded: false,
					title: "Hey There",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "ofmTag",
									value: "tag",
								},
								{
									type: "text",
									value: "\n",
								},
								{
									type: "ofmWikilink",
									url: "link",
									hash: "",
									value: "link",
								},
							],
						},
					],
				},
			],
		});
	});

	test("ofmToMarkdown", () => {
		const markdown = toMarkdown(
			{
				type: "root",
				children: [
					{
						type: "ofmCallout",
						kind: "info",
						folded: false,
						title: "Hey There",
						children: [
							{
								type: "paragraph",
								children: [
									{
										type: "ofmTag",
										value: "tag",
									},
									{
										type: "text",
										value: "\n",
									},
									{
										type: "ofmWikilink",
										url: "link",
										hash: "",
										value: "link",
									},
								],
							},
						],
					},
				],
			},
			{ extensions: [ofmToMarkdown()] },
		);
		expect(markdown).toEqual("> [!info]+ Hey There\n> #tag\n> [[link]]\n");
	});
});
