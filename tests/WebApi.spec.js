const { test, request, expect } = require("@playwright/test");
const { apiUtils } = require("../utils/apiUtils.js");

const loginPayLoad = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }],
};

let response; //Declared a global variable to store API response data. Will hold both authentication token & order ID
//This block executes ONCE before running all tests
test.beforeAll(async () => {
  const apiContext = await request.newContext(); //Creates a new HTTP client context for API calls. Playwright's APIRequestContext for making HTTP requests
  const ApiUtils = new apiUtils(apiContext, loginPayLoad); // Creates an instance of the custom apiUtils class. Parameters: apiContext: HTTP client for making requests.
  //loginPayload: user credentials for authentication.
  //Constructor: stores both parameters for later use
  response = await ApiUtils.createOrder(orderPayLoad); //Calls the createOrder method to create an order via API.
});

test("eCommerce App Test", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");

  //Verify order ID in order history:
  await page.locator("button[routerlink*='myorders']").click();
});
