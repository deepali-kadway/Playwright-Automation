const { When, Then, Given, context } = require("@cucumber/cucumber");
const { test, expect, playwright } = require("@playwright/test");

Given(
  "a login to Ecommerce application with {string} and {string}",
  async function (username, password) {
    const browser = playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(username);
    await page.locator("#userPassword").fill(password);
    await page.locator("[type='submit']").click();
  }
);

When("Add {string} to Cart", function (string) {
  return "pending";
});

Then("Verify {string} is displayed in the Cart", function (string) {
  return "pending";
});

When("Enter Valid details and place the Order", function () {
  return "pending";
});

Then("Verify order is present in order history", function () {
  return "pending";
});
