import { Grade, add } from "../src/render/utils/calculator";

it("add correctly", () => {
  expect(add(3, 5)).toBe(8);
});

it("class test", () => {
  const item = new Grade(90, 80);

  expect(item.sum()).toBe(170);
});
