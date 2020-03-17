import { defineFeature, loadFeature } from "jest-cucumber";
import { gretting } from "./bercy";

const feature = loadFeature("bercy.feature");

defineFeature(feature, test => {
  let name: string, result: string;

  test("say hello word with name and exclamation to the end", ({
    given,
    when,
    then,
    and
  }) => {
    given(/^my name is (.*)$/, (inputName: string) => {
      name = inputName;
    });

    when("i say hello", () => {
      result = gretting(name);
    });

    then("say hello with name", () => {
      expect(result).toBe(`Hello word from ${name}!`);
    });

    and("should have exclamation mark", () => {
      expect(result.endsWith("!")).toBeTruthy();
    });
  });
});
