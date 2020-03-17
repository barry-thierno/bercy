import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("src/bercy.feature");

defineFeature(feature, test => {
  test("Launching a SpaceX rocket", ({ given, when, then, and }) => {
    given("I am Elon Musk attempting to launch a rocket into space", () => {});

    when("I launch the rocket", () => {});

    then("the rocket should end up in space", () => {});

    and("the booster(s) should land back on the launch pad", () => {});

    and("nobody should doubt me ever again", () => {});
  });
});
