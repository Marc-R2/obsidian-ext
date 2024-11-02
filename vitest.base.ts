import { defineConfig } from "vitest/config";

export const VitestBaseConfig = defineConfig({
	test: {
		include: ["test/**/*.test.ts"],
		coverage: {
			provider: "v8",
			include: ["src/**/*"],
			thresholds: {
				100: true,
			},
		},
	},
});
