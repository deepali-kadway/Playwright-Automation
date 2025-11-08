Feature: ECommerce Validations

Scenario Outline: Login Test Negative Scenario
    Given a login to eCommerce app with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
        | username               | password         |
        | test1980@gmail.com     | Tester@1234      |
        | invalidemail@gmail.com | TestInvalid@1234 |