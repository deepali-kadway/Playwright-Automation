const { test, expect } = require("@playwright/test");

test("Calender Validations", async ({ page }) => {
  //Date: 15th June 2024 to be selected
  const monthNumber = "6";
  const date = "15";
  const year = "2024";

  //fetch selected date from browser
  const expectedList = [monthNumber, date, year];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label__labelText").click(); //will show the month
  await page.locator(".react-calendar__navigation__label__labelText").click(); //will show the year

  await page.getByText(year).click();
  await page
    .locator(".react-calendar__year-view__months__month") //12 matching elements
    .nth(Number(monthNumber) - 1) //marked as 0 to 11, hence monthNumber - 1, to locate 5th element that is June
    .click();
  await page.locator(`//abbr[text()='${date}']`).click(); //xpath: //abbr[text()="8"]

  //fetch selected date from browser
  const inputs = page.locator(".react-date-picker__inputGroup__input");
  for (let i = 0; i < expectedList.length; i++) {
    const value = await inputs.nth(i).inputValue();
    expect(value).toEqual(expectedList[i]);
  }
});
