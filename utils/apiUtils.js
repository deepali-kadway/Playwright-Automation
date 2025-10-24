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

  async createOrder(createPayload) {
    let response = {};
    response.token = await this.getToken();
    //headers are added as the browser should know to place order from the logged in token. As per api call of create, developer was passing authorization token as well, hence we added Authorization
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: createPayload,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      }
    );
    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);
    const orderId = orderResponseJSON.orders[0];
    response.orderId = orderId;
    return response;
  }
}

module.exports = { apiUtils };
