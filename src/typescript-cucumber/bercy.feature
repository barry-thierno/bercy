Feature: Hello word

    Scenario: say hello word with name and exclamation to the end
        Given my name is "Titi"
        When i say hello
        Then say hello with name
        And should have exclamation mark