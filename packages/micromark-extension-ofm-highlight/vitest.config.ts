import { defineConfig, mergeConfig } from "vitest/config";
import { VitestBaseConfig } from "../../vitest.base";

export default mergeConfig(VitestBaseConfig, defineConfig({}));
