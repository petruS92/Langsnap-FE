import { extractingNumbers } from "../utils/extractingNumbers";

const words = [
  ["Languages", "words"],
  ["French", 4],
  ["German", 8],
  ["Spanish", 0],
];

describe("Testing extractingNumbers", () => {
  test("returns a number", () => {
    expect(typeof extractingNumbers(words)).toBe("number");
  });

  test("returns 10 if nothing is passed", () => {
    expect(extractingNumbers()).toBe(10);
  });

  test("returns the number that corresponds to the longest array", () => {
    expect(extractingNumbers(words)).toBe(13);
  });
});
