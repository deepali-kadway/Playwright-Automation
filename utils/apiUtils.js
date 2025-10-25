const { expect } = require("@playwright/test");

class apiUtils {
  //apiContext will be sent from WebApi.spec.js page and captured here in constructor
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayLoad,
      }
    );
    expect(loginResponse.ok()).toBeTruthy(); //returns true if you get success status code
    const loginResponseJSON = await loginResponse.json();
    const token = loginResponseJSON.token;
    console.log("Token: ", token);
    return token;
  }

  async createOrder(orderPayLoad) {
    let response = {};
    response.token = await this.getToken();
    //headers are added as the browser should know to place order from the logged in token. As per api call of create, developer was passing authorization token as well, hence we added Authorization
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      }
    );
    const orderResponseJSON = await orderResponse.json();
    console.log(
      "Full API Response:",
      JSON.stringify(orderResponseJSON, null, 2)
    );

    // Debug: Check if orders array exists
    if (!orderResponseJSON.orders) {
      console.log("ERROR: 'orders' property not found in response");
      console.log("Available properties:", Object.keys(orderResponseJSON));
      throw new Error("Orders array not found in API response");
    }

    const orderId = orderResponseJSON.orders[0];
    response.orderId = orderId;
    return response;
  }
}

module.exports = { apiUtils };
