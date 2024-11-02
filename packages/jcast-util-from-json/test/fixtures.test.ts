import { suite, test, expect } from "vitest";
import { readdir, readFile, writeFile } from "fs/promises";
import { fromJson } from "../src/index";

suite("jcast-util-from-json", async () => {
	const directory = new URL("fixtures/", import.meta.url);
	const files = await readdir(directory);
	const input_extension = ".canvas";
	const output_extension = ".json";

	for (const file of files) {
		if (!file.endsWith(input_extension)) continue;
		const test_name = file.slice(0, -input_extension.length);

		test(`fixture: ${test_name}`, async () => {
			const input = await readFile(new URL(file, directory), "utf-8");
			const actual = fromJson(input);

			const output = new URL(test_name + output_extension, directory);
			const expected = await readFile(output, "utf-8")
				.then((content) => JSON.parse(content))
				.catch(async () => {
					// Create missing fixtures
					await writeFile(output, JSON.stringify(actual, null, 4));
					console.log("Created Fixture:", test_name);
					return actual;
				});

			expect(actual).toEqual(expected);
		});
	}
});
