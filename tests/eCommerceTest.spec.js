const { test, expect } = require("@playwright/test");

test("eCommerce App Test", async ({ page }) => {
  //Login Page
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("test1980@gmail.com");
  await page.locator("#userPassword").fill("Tester@1234");
  await page.locator("[type='submit']").click();

  //Use assertions instead of networkidle in waitforLoadState
  await expect(page.locator(".card-img-top")).toHaveCount(3);
  await expect(
    page.getByRole("button", { name: "Add to Cart" }).first()
  ).toBeEnabled();

  //Product display page. Iterate through products to find the desired product
  const productName = "ADIDAS ORIGINAL"; //product to search and add to cart
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const products = page.locator(".card-body");
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    //restricted chaining and searching only within .card-body scope
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add the product to cart if match is found
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  //OR instead of for, you can use method chaining:
  // await page
  //   .locator(".card-body")
  //   .filter({ hasText: "ADIDAS ORIGINAL" })
  //   .getByRole("button", { name: "Add to Cart" })
  //   .click();

  //Go to cart and checkout
  //This waits for the loading spinner to disappear before attempting the click.
  await expect(page.locator(".ngx-spinner-overlay")).toBeHidden();
  await page.locator("[routerlink*='dashboard/cart']").click();

  await expect(page.locator("text='My Cart'")).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page.locator("text='Payment Method'")).toBeVisible();
  //Another way of identifying text for assertions
  const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible(); //used for boolean check
  expect(bool).toBeTruthy;

  //Add payment & dyanmic dropdown selection
  await expect(page.locator("text=' Payment Method '")).toBeVisible();
  await page
    .locator("[value='4542 9931 9292 2293']")
    .fill("4542 9931 9292 2293");
  await page.locator(".input.ddl").nth(0).selectOption("03");
  await page.locator(".input.ddl").nth(1).selectOption("13");
  //OR
  // await page.locator(".row .field.small select").nth(0).selectOption('03')
  // Most readable and maintainable
  await page.locator(".field.small input").nth(0).fill("123"); //cvv
  await page.locator(".row .field input").nth(2).fill("Deepali Test"); //name
  await page.locator(".field.small input").nth(1).fill("rahulshettyacademy"); //coupon
  await page.getByRole("button", { name: "Apply Coupon" }).click();
  await page.locator('[placeholder="Select Country"]').click(); // Click to activate
  await page.locator(".form-group").pressSequentially("ind", { delay: 150 }); //and then type. this will avoid timeout errors
  const dynamicDropDown = page.locator(".ta-results");
  await dynamicDropDown.waitFor();
  const optionsCount = await dynamicDropDown.locator("button").count(); //search will be inside .ta-results for button tag
  for (let i = 0; i <= optionsCount; i++) {
    const text = await dynamicDropDown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dynamicDropDown.locator("button").nth(i).click();
      break;
    }
  }
  await page.locator(".action__submit").click();
});
