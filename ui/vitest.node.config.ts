import { defineConfig } from "vitest/config";

// Node-only tests for pure logic (no Playwright/browser dependency).
export default defineConfig({
  test: {
    testTimeout: 120_000,
    include: ["src/**/*.node.test.ts"],
    environment: "node",
    // Cap memory per worker — Node 24 defaults to 8.4 GB heap, which causes OOM
    // under parallel test runs. 512 MB is ample for pure-logic node tests.
    pool: "forks",
    maxForks: 3,
    minForks: 1,
    poolOptions: {
      forks: {
        execArgv: ["--max-old-space-size=512"],
      },
    },
  },
});
