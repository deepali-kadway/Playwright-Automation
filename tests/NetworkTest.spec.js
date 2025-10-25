const { test, request, expect } = require("@playwright/test");
const { apiUtils } = require("../utils/apiUtils.js");

const loginPayLoad = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "68a961959320a140fe1ca57e" }],
};

const mockPayLoadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const ApiUtils = new apiUtils(apiContext, loginPayLoad);
  response = await ApiUtils.createOrder(orderPayLoad);
});

test("eCommerce App Test", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");

  // Intercept ANY order API call
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(mockPayLoadOrders);
      route.fulfill({
        response,
        body,
      });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    }
  );

  //   await page.pause();
  //Verify order ID in order history:
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );

  console.log(await page.locator(".mt-4").textContent());
});
