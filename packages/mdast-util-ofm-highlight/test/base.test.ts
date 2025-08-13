import { suite, test, expect } from "vitest";
import { removePosition } from "unist-util-remove-position";
import { ofmHighlightFromMarkdown, ofmHighlightToMarkdown } from "../src";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { ofmHighlight } from "micromark-extension-ofm-highlight";

suite("mdast-util-ofm-highlight", async () => {
	test("ofmHighlightFromMarkdown", () => {
		const tree = fromMarkdown("a ==b== c", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "a " },
						{ type: "ofmHighlight", value: "b", pre: 2, post: 2 },
						{ type: "text", value: " c" },
					],
				},
			],
		});
	});

	test("ofmHighlightToMarkdown", () => {
		const markdown = toMarkdown(
			{
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "a " },
							{ type: "ofmHighlight", value: "b", pre: 2, post: 2 },
							{ type: "text", value: " c" },
						],
					},
				],
			},
			{ extensions: [ofmHighlightToMarkdown()] },
		);

		expect(markdown).toEqual("a ==b== c\n");
	});

	test("multiple highlights in same paragraph", () => {
		const tree = fromMarkdown("a ==first== and ==second== text", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "a " },
						{ type: "ofmHighlight", value: "first", pre: 2, post: 2 },
						{ type: "text", value: " and " },
						{ type: "ofmHighlight", value: "second", pre: 2, post: 2 },
						{ type: "text", value: " text" },
					],
				},
			],
		});
	});

	test("different marker sizes", () => {
		const tree = fromMarkdown("===triple=== ====quad====", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "ofmHighlight", value: "triple", pre: 3, post: 3 },
						{ type: "text", value: " " },
						{ type: "ofmHighlight", value: "quad", pre: 4, post: 4 },
					],
				},
			],
		});
	});

	test("single equals should not be parsed as highlight", () => {
		const tree = fromMarkdown("a =not highlight= b", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "text", value: "a =not highlight= b" }],
				},
			],
		});
	});

	test("mismatched marker sizes should not parse", () => {
		const tree = fromMarkdown("==two equals=== three", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "ofmHighlight", value: "two equals", pre: 2, post: 3 },
						{ type: "text", value: " three" },
					],
				},
			],
		});
	});

	test("empty highlight content", () => {
		const tree = fromMarkdown("==== empty", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "text", value: "==== empty" }],
				},
			],
		});
	});

	test("highlight with spaces should not parse", () => {
		const tree = fromMarkdown("== spaces break ==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "text", value: "== spaces break ==" }],
				},
			],
		});
	});

	test("highlight at start of line", () => {
		const tree = fromMarkdown("==start== of line", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "ofmHighlight", value: "start", pre: 2, post: 2 },
						{ type: "text", value: " of line" },
					],
				},
			],
		});
	});

	test("highlight at end of line", () => {
		const tree = fromMarkdown("end of ==line==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "end of " },
						{ type: "ofmHighlight", value: "line", pre: 2, post: 2 },
					],
				},
			],
		});
	});

	test("highlight with numbers and special characters", () => {
		const tree = fromMarkdown("==test123!@#$%==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "test123!@#$%", pre: 2, post: 2 }],
				},
			],
		});
	});

	test("nested equals within content", () => {
		const tree = fromMarkdown("==a=b=c==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "a=b=c", pre: 2, post: 2 }],
				},
			],
		});
	});

	test("incomplete highlight at end of input", () => {
		const tree = fromMarkdown("text ==incomplete", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "text " },
						{ type: "ofmHighlight", value: "incomplete", pre: 2, post: 0 },
					],
				},
			],
		});
	});

	test("toMarkdown with different marker sizes", () => {
		const markdown = toMarkdown(
			{
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "ofmHighlight", value: "double", pre: 2, post: 2 },
							{ type: "text", value: " " },
							{ type: "ofmHighlight", value: "triple", pre: 3, post: 3 },
						],
					},
				],
			},
			{ extensions: [ofmHighlightToMarkdown()] },
		);

		expect(markdown).toEqual("==double== ===triple===\n");
	});

	test("toMarkdown with complex content", () => {
		const markdown = toMarkdown(
			{
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "Before " },
							{ type: "ofmHighlight", value: "complex!@#123", pre: 2, post: 2 },
							{ type: "text", value: " after" },
						],
					},
				],
			},
			{ extensions: [ofmHighlightToMarkdown()] },
		);

		expect(markdown).toEqual("Before ==complex!@#123== after\n");
	});

	test("multiple paragraphs with highlights", () => {
		const tree = fromMarkdown("First ==highlight== here.\n\nSecond ==highlight== there.", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "First " },
						{ type: "ofmHighlight", value: "highlight", pre: 2, post: 2 },
						{ type: "text", value: " here." },
					],
				},
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "Second " },
						{ type: "ofmHighlight", value: "highlight", pre: 2, post: 2 },
						{ type: "text", value: " there." },
					],
				},
			],
		});
	});

	test("very long marker sequences", () => {
		const tree = fromMarkdown("======long======", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "long", pre: 6, post: 6 }],
				},
			],
		});
	});

	test("highlight immediately followed by punctuation", () => {
		const tree = fromMarkdown("==word==.", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "ofmHighlight", value: "word", pre: 2, post: 2 },
						{ type: "text", value: "." },
					],
				},
			],
		});
	});

	test("single equals in content should be treated as content", () => {
		const tree = fromMarkdown("==before=after==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "before=after", pre: 2, post: 2 }],
				},
			],
		});
	});

	test("multiple single equals in content", () => {
		const tree = fromMarkdown("==a=b=c=d=e==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "a=b=c=d=e", pre: 2, post: 2 }],
				},
			],
		});
	});

	test("equals at start of content", () => {
		const tree = fromMarkdown("===text==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "text", pre: 3, post: 2 }],
				},
			],
		});
	});

	test("equals at end of content", () => {
		const tree = fromMarkdown("==text===", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "text", pre: 2, post: 3 }],
				},
			],
		});
	});

	test("complex pattern with mixed equals", () => {
		const tree = fromMarkdown("==a=bb==cc=dd==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "ofmHighlight", value: "a=bb", pre: 2, post: 2 },
						{ type: "text", value: "cc=dd==" },
					],
				},
			],
		});
	});

	test("false positive closing marker", () => {
		const tree = fromMarkdown("==text=close==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "text=close", pre: 2, post: 2 }],
				},
			],
		});
	});

	test("multiple false closing markers", () => {
		const tree = fromMarkdown("==a=b=c=d==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "a=b=c=d", pre: 2, post: 2 }],
				},
			],
		});
	});

	test("equation-like content", () => {
		const tree = fromMarkdown("==x=y+z==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "x=y+z", pre: 2, post: 2 }],
				},
			],
		});
	});

	test("highlight and newline", () => {
		const tree = fromMarkdown("Math: ==x=y+z==\n==highlight== and more text", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "Math: " },
						{ type: "ofmHighlight", value: "x=y+z", pre: 2, post: 2 },
						{ type: "text", value: "\n" },
						{ type: "ofmHighlight", value: "highlight", pre: 2, post: 2 },
						{ type: "text", value: " and more text" },
					],
				},
			],
		});
	});

	test("newline in highlight", () => {
		const tree = fromMarkdown("Math: ==x=y+z\nhighlight== and more text", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "Math: " },
						{ type: "ofmHighlight", value: "x=y+z\nhighlight", pre: 2, post: 2 },
						{ type: "text", value: " and more text" },
					],
				},
			],
		});
	});

	test("highlight and paragraph", () => {
		const tree = fromMarkdown("==x=y+z==\n\n==highlight== and more text", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "x=y+z", pre: 2, post: 2 }],
				},
				{
					type: "paragraph",
					children: [
						{ type: "ofmHighlight", value: "highlight", pre: 2, post: 2 },
						{ type: "text", value: " and more text" },
					],
				},
			],
		});
	});

	test("paragraph in highlight", () => {
		const tree = fromMarkdown("==x=y+z\n\nhighlight== and more text", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "x=y+z", pre: 2, post: 0 }],
				},
				{
					type: "paragraph",
					children: [{ type: "text", value: "highlight== and more text" }],
				},
			],
		});
	});

	test("empty text should return empty root", () => {
		const tree = fromMarkdown("", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [],
		});
	});

	test("text with no highlights", () => {
		const tree = fromMarkdown("This is a simple text without any highlights.", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "This is a simple text without any highlights." },
					],
				},
			],
		});
	});

	test("unclosed highlight at the end", () => {
		const tree = fromMarkdown("some text ==unclosed", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "some text " },
						{ type: "ofmHighlight", value: "unclosed", pre: 2, post: 0 },
					],
				},
			],
		});
	});

	test("unicode characters in highlights", () => {
		const tree = fromMarkdown("==🚀 émojis and ñoñó==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "ofmHighlight", value: "🚀 émojis and ñoñó", pre: 2, post: 2 },
					],
				},
			],
		});
	});

	test("special regex characters in content", () => {
		const tree = fromMarkdown("==.*+?^${}()|[]\\==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: ".*+?^${}()|[]\\", pre: 2, post: 2 }],
				},
			],
		});
	});

	test("quotes and escapes in highlights", () => {
		const tree = fromMarkdown("==\"quotes\" and 'apostrophes' and \\backslashes==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ofmHighlight",
							value: "\"quotes\" and 'apostrophes' and \\backslashes",
							pre: 2,
							post: 2,
						},
					],
				},
			],
		});
	});

	test("multiple consecutive highlight markers", () => {
		const tree = fromMarkdown("======text======", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "text", pre: 6, post: 6 }],
				},
			],
		});
	});

	test("single = characters that are not highlights", () => {
		const tree = fromMarkdown("text = not highlight = text", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "text", value: "text = not highlight = text" }],
				},
			],
		});
	});

	test("alternating highlights and text", () => {
		const tree = fromMarkdown("==a==b==c==d==e==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "ofmHighlight", value: "a", pre: 2, post: 2 },
						{ type: "text", value: "b" },
						{ type: "ofmHighlight", value: "c", pre: 2, post: 2 },
						{ type: "text", value: "d" },
						{ type: "ofmHighlight", value: "e", pre: 2, post: 2 },
					],
				},
			],
		});
	});

	test("highlight with only special characters", () => {
		const tree = fromMarkdown('==!@#$%^&*()_+-={}[]|\\:";<>?,./==', {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ofmHighlight",
							value: '!@#$%^&*()_+-={}[]|\\:";<>?,./',
							pre: 2,
							post: 2,
						},
					],
				},
			],
		});
	});

	test("highlight spanning soft line breaks", () => {
		const tree = fromMarkdown("==line1\nline2==", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: "line1\nline2", pre: 2, post: 2 }],
				},
			],
		});
	});

	test("mixed content with code-like patterns", () => {
		const tree = fromMarkdown(
			"function test() {\n  return ==someVariable== === ==otherVar==;\n}",
			{
				extensions: [ofmHighlight()],
				mdastExtensions: [ofmHighlightFromMarkdown()],
			},
		);

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "function test() {\nreturn " },
						{ type: "ofmHighlight", value: "someVariable", pre: 2, post: 2 },
						{ type: "text", value: " === " },
						{ type: "ofmHighlight", value: "otherVar", pre: 2, post: 2 },
						{ type: "text", value: ";\n}" },
					],
				},
			],
		});
	});

	test("CRLF line endings", () => {
		const tree = fromMarkdown("line1\r\n==highlight==\r\nline2", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "text", value: "line1\r\n" },
						{ type: "ofmHighlight", value: "highlight", pre: 2, post: 2 },
						{ type: "text", value: "\r\nline2" },
					],
				},
			],
		});
	});

	test("many false positive highlight markers", () => {
		const tree = fromMarkdown("= == === ==== ===== ====== =======", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "text", value: "= == === ==== ===== ====== =======" }],
				},
			],
		});
	});

	test("toMarkdown with mismatched markers", () => {
		const markdown = toMarkdown(
			{
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [{ type: "ofmHighlight", value: "text", pre: 3, post: 2 }],
					},
				],
			},
			{ extensions: [ofmHighlightToMarkdown()] },
		);

		expect(markdown).toEqual("===text==\n");
	});

	test("toMarkdown with no closing markers", () => {
		const markdown = toMarkdown(
			{
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [{ type: "ofmHighlight", value: "unclosed", pre: 2, post: 0 }],
					},
				],
			},
			{ extensions: [ofmHighlightToMarkdown()] },
		);

		expect(markdown).toEqual("==unclosed\n");
	});

	test("very long content", () => {
		const longText = "a".repeat(1000);
		const tree = fromMarkdown(`==${longText}==`, {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "ofmHighlight", value: longText, pre: 2, post: 2 }],
				},
			],
		});
	});

	test("many highlights in sequence", () => {
		const text = Array(50).fill("==hi==").join(" ");
		const tree = fromMarkdown(text, {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		const expectedChildren = [];
		for (let i = 0; i < 50; i++) {
			if (i > 0) {
				expectedChildren.push({ type: "text", value: " " });
			}
			expectedChildren.push({ type: "ofmHighlight", value: "hi", pre: 2, post: 2 });
		}

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: expectedChildren,
				},
			],
		});
	});

	test("single character strings", () => {
		const tree1 = fromMarkdown("=", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});
		removePosition(tree1, { force: true });
		expect(tree1).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "text", value: "=" }],
				},
			],
		});

		const tree2 = fromMarkdown("\n", {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});
		removePosition(tree2, { force: true });
		expect(tree2).toEqual({
			type: "root",
			children: [],
		});
	});

	test("only highlight markers", () => {
		const text = "==".repeat(50);
		const tree = fromMarkdown(text, {
			extensions: [ofmHighlight()],
			mdastExtensions: [ofmHighlightFromMarkdown()],
		});

		removePosition(tree, { force: true });

		expect(tree).toEqual({
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "text", value: text }],
				},
			],
		});
	});
});
