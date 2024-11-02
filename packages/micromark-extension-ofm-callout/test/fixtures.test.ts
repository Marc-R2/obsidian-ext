import { suite, test, expect } from "vitest";
import { readdir, readFile, writeFile } from "fs/promises";
import { micromark } from "micromark";
import { ofmCallout, ofmCalloutHtml } from "../src/index.js";

suite("micromark-extension-ofm-callout", async () => {
	const directory = new URL("fixtures/", import.meta.url);
	const files = await readdir(directory);
	const input_extension = ".md";
	const output_extension = ".html";

	for (const file of files) {
		if (!file.endsWith(input_extension)) continue;
		const test_name = file.slice(0, -input_extension.length);

		test(`fixture: ${test_name}`, async () => {
			const input = await readFile(new URL(file, directory), "utf-8");
			const actual = micromark(input, {
				extensions: [ofmCallout()],
				htmlExtensions: [ofmCalloutHtml()],
			});

			const output = new URL(test_name + output_extension, directory);
			const expected = await readFile(output, "utf-8").catch(async () => {
				// Create missing fixtures
				await writeFile(output, actual);
				console.log("Created Fixture:", test_name);
				return actual;
			});

			expect(actual).toEqual(expected);
		});
	}
});
