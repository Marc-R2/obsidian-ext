import { suite, test, expect } from "vitest";
import { jsonCanvas } from "../src/index";

suite("jsoncanvas", async () => {
	test("should throw for invalid json", () => {
		expect(() => jsonCanvas("{")).toThrow();
	});

	test("should throw for empty data", () => {
		expect(() => jsonCanvas("")).toThrow();
	});

	test("should throw for invalid schema", () => {
		expect(() => jsonCanvas(JSON.stringify({ message: "Hello There!" }))).toThrow();

		expect(() =>
			jsonCanvas(
				JSON.stringify({
					nodes: [
						{
							id: "1",
							type: "text",
							x: 0,
							y: 0,
							width: 100,
							height: 100,
							text: "Hello World!",
							color: "1",
							extra: "extra",
						},
					],
				}),
			),
		).toThrow();
	});
});
