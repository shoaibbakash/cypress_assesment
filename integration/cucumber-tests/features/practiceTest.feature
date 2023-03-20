Feature: Practice Test -

    Scenario Outline: Demo
    Given User navigates to practice test page
    When practice test page is loaded
    Then verify new tab opened
    Then upload file and verify
    Then hide input and verify
    Then mouse hover and click
    Then select dropdown option and verify selected value '<dropdown>'
    Then verify elements in iframe displayed
    Then mock request using fixtures
    Then Read file using cy.task and display alert

    Examples:
     |dropdown|
     |Option2 |

