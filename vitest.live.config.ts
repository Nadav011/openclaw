import { defineConfig } from "vitest/config";
import baseConfig from "./vitest.config.ts";

const base = baseConfig as unknown as Record<string, unknown>;
const baseTest = (baseConfig as { test?: { exclude?: string[] } }).test ?? {};
const exclude = (baseTest.exclude ?? []).filter((p) => p !== "**/*.live.test.ts");

export default defineConfig({
  ...base,
  test: {
    ...baseTest,
    maxWorkers: 1,
    poolOptions: {
      forks: {
        execArgv: ["--max-old-space-size=1024"],
      },
    },
    include: ["src/**/*.live.test.ts"],
    exclude,
  },
});
