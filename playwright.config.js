// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  retries: 1,
  // number of parallel test workers workers: 4,
  timeout: 40 * 1000, //sets timeout to 40 secs
  expect: {
    timeout: 5000,
  },

  reporter: "html",
  projects: [
    {
      name: "chromium",
      use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        ignoreHTTPSErrors: true,
        permissions: ["geolocation"],
        // trace: "on",
        trace: "retain-on-failure", //traces will generate only in failure
        viewport: { width: 720, height: 720 },
      },
    },
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "off",
        video: "retain-on-failure",
        trace: "on",
        ...devices["iPhone 11"], //webkit part of safari. Test on Apple devices using webkit
      },
    },
    {
      name: "firefox",
      use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        browserName: "firefox",
        headless: true,
        screenshot: "off",
        // trace: "on",
        trace: "retain-on-failure", //traces will generate only in failure
      },
    },
  ],
});
