import { suite, test, expect } from "vitest";
import { remark } from "remark";
import { unified } from "unified";
import remarkOfm from "../src/index";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

suite("remark-ofm", async () => {
	test("remark", async () => {
		const file = await remark()
			.use(remarkOfm)
			.process("> [!info]+ Hey There\n> #tag\n> [[link]]");

		expect(String(file)).toEqual("> [!info]+ Hey There\n> #tag\n> [[link]]\n");
	});

	test("unified", async () => {
		const file = await unified()
			.use(remarkParse)
			.use(remarkOfm)
			.use(remarkStringify)
			.process("> [!info]+ Hey There\n> #tag\n> [[link]]");

		expect(String(file)).toEqual("> [!info]+ Hey There\n> #tag\n> [[link]]\n");
	});
});
