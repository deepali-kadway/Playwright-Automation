Feature: Ecommerce Validations

    Scenario: Placing the Order
    # For a given values which you have, in this case login details. Whatever details you pass here will be sent to your browser during execution.
    Given a login to Ecommerce application with "test1980@gmail.com" and "Tester@1234" 
    # When an action is perfomed, Then do this or verify
    When Add "Zara Coat 3" to Cart
    Then Verify "Zara Coat 3" is displayed in the Cart
    When Enter Valid details and place the Order
    Then Verify order is present in order history

    # Multiple when-then-given can be written inside one scenario. 
    # You can use whatever English you want, provided it is readable
    # Always create step definitions and associate with Cucumber.js config file