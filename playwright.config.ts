import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  retries: 0,
  workers: 1,
  reporter: [["list"], ["json", { outputFile: "test-results/report.json" }]],
  use: {
    baseURL: process.env.PORTFOLIO_URL || "http://localhost:3008",
    viewport: { width: 1440, height: 1000 },
    browserName: "chromium",
    launchOptions: { channel: "chrome" },
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
});
