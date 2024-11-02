import { suite, test, expect } from "vitest";
import { micromark } from "micromark";
import { ofmCallout, ofmCalloutHtml } from "../src/index.js";

suite("micromark-extension-ofm-callout", () => {
	test("with disabled codeIndented", () => {
		const input = "> [!info]\n\tcontent\n";
		const expected = `<blockquote class="callout" data-type="info">\n<summary>Info</summary>\n</blockquote>\n<p>content</p>\n`;
		const actual = micromark(input, {
			extensions: [ofmCallout(), { disable: { null: ["codeIndented"] } }],
			htmlExtensions: [ofmCalloutHtml()],
		});

		expect(actual).toEqual(expected);
	});
});
