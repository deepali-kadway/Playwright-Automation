// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  timeout: 40 * 1000, //sets timeout to 40 secs
  expect: {
    timeout: 5000,
  },

  reporter: "html",
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    // trace: "on",
    trace: "retain-on-failure", //traces will generate only in failure
  },
});
