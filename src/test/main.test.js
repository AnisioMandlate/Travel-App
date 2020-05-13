import { performAction } from "../client/js/main";

describe("The function performAction() should exist", () => {
  test("It should return true", async () => {
    expect(performAction).toBeDefined();
  });
});

describe("The function performAction() should be a function", () => {
  test("It should be a function", async () => {
    expect(typeof performAction).toBe("function");
  });
});
