import * as wordsListFunctions from "../utils/wordsListFunctions";

describe("Testing the wordsListFunctions", () => {
  test("selectWords ", () => {
    expect(wordsListFunctions.selectWords()).toBe({});
  });
});
