import { suite, test, expect } from "vitest";
import { removePosition } from "unist-util-remove-position";
import { ofmCalloutFromMarkdown, ofmCalloutToMarkdown } from "../src/index.js";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { ofmCallout } from "@moritzrs/micromark-extension-ofm-callout";

suite("mdast-util-ofm-callout", () => {
	test("ofmCalloutFromMarkdown", () => {
		const tree = fromMarkdown("> [!info]+ Callout\n> This is a callout\n", {
			extensions: [ofmCallout()],
			mdastExtensions: [ofmCalloutFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "ofmCallout",
					kind: "info",
					title: "Callout",
					folded: false,
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "text",
									value: "This is a callout",
								},
							],
						},
					],
				},
			],
		});
	});

	test("ofmCalloutToMarkdown", () => {
		const markdown = toMarkdown(
			{
				type: "root",
				children: [
					{
						type: "ofmCallout",
						kind: "info",
						title: "Callout",
						folded: undefined,
						children: [
							{
								type: "paragraph",
								children: [
									{
										type: "text",
										value: "\nThis is a callout",
									},
								],
							},
						],
					},
					{
						type: "ofmCallout",
						kind: "info",
						title: "Callout",
						folded: true,
						children: [],
					},
					{
						type: "ofmCallout",
						kind: "info",
						title: "Callout",
						folded: false,
						children: [],
					},
				],
			},
			{ extensions: [ofmCalloutToMarkdown()] },
		);

		expect(markdown).toEqual(
			"> [!info] Callout\n>\n> This is a callout\n\n> [!info]- Callout\n\n\n> [!info]+ Callout\n",
		);
	});
});
