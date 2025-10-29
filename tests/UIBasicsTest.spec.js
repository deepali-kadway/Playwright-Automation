const { test, expect } = require("@playwright/test"); //imported annotation and named it as 'test'

test.describe.configure({ mode: "parallel" });
//test annotation takes two arguments
// First: actual test case name
// Second: test function
test("@Web First Playwright Test", async ({ browser }) => {
  //chrome - plugins/ cookies
  const context = await browser.newContext(); //creates a new browser context. A context is like an incognito session - it's isolated with its own cookies, local storage, and session data.
  const page = await context.newPage(); //creates a new tab withing that context
  await page.goto("https://example.com"); //Navigates to specified URL
  await context.close(); // manual cleanup
});

test("Second Playwright Test", async ({ page }) => {
  await page.goto(
    "https://movelearnplay.edmonton.ca/COE/public/Logon/Logon?ReturnURL=%2FCOE%2Fmembers"
  );
  //get title assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Log In - move.learn.play");
  await page.locator("#EmailAddress").fill("learning@gmail.com");
  await page.locator('input[type="password"]').fill("passwordNew");
  await page.locator('input[value="Log In"]').click();

  // Best practice: Use getByText with assertion
  const errorMessage = page.getByText(
    "email or password provided is incorrect"
  );

  // Assert the error message is visible
  await expect(errorMessage).toBeVisible();

  // Assert the exact text content
  await expect(errorMessage).toHaveText(
    "The email or password provided is incorrect. Please try again."
  );

  // Optional: Get text content for logging
  const errorText = await errorMessage.textContent();
  console.log("Error message:", errorText);
});

test("Third Playwright Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("learning");
  await page.locator("select.form-control").selectOption("consult");

  await page.locator(".radiotextsty").last().click();
  await expect(page.locator(".radiotextsty").last()).toBeChecked(); //assetion to return true if checkbox is checked.
  await page.locator("#okayBtn").click();
  await page.locator("#terms").check();
  await expect(page.locator("#terms")).toBeChecked(); //checks if checkbox is checked
  await page.locator("#terms").uncheck(); //unchecks the checkbox
  await expect(page.locator("#terms")).not.toBeChecked();
});

test("Child Control Handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  //When a set of steps needs to be parallelly executed, we use promise
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), //waitForEvent waits for any pages to open in the background. And if any new page opens, it returns that new page variable
    //above listens for any promise (states: pending, rejected, fulfilled)
    documentLink.click(), //This will open in separate window, as per developers code. Need to handle this new page
  ]);
  //This array of promise will keep firing two steps parallely and it will wait until both these promises are successfully fulfilled.
  // If any of the step promise is rejected, the script will fail

  const text = await newPage.locator(".red").textContent(); //fetch a text in red from new page
  // console.log(text);
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator("#username").fill(domain);
  console.log(await page.locator("#username").inputValue());
});
