import { graphData } from "../utils/graphData";

const words = {
  German: [
    { cat: "die Katze" },
    { pick: "Auswahl" },
    { cat: "die Katze" },
    { pick: "Auswahl" },
    { cat: "die Katze" },
    { pick: "Auswahl" },
    { cat: "die Katze" },
    { pick: "Auswahl" },
  ],
  French: [
    { cheese: "le fromage" },
    { pick: "Auswahl" },
    { cat: "le chat" },
    { pick: "Auswahl" },
  ],
  Spanish: [],
};

describe("Testing graphData", () => {
  test("Array index 0 must always be ['Languages', 'words']", () => {
    expect(graphData(words)[0]).toEqual(["Languages", "words"]);
  });

  test("must return an array of arrays which have the languages and the word count", () => {
    expect(graphData(words)).toEqual([
      ["Languages", "words"],
      ["German", 8],
      ["French", 4],
      ["Spanish", 0],
    ]);
  });

  test("Array index 0 must always be ['Languages', 'words'] when nothing passed as an argument", () => {
    expect(graphData()[0]).toEqual(["Languages", "words"]);
  });

  test("Array index 0 must always be ['Languages', 'words'] passed an empty object", () => {
    expect(graphData({})[0]).toEqual(["Languages", "words"]);
  });

  test("Array index 0 must always be ['Languages', 'words'] passed null", () => {
    expect(graphData(null)[0]).toEqual(["Languages", "words"]);
  });

  test("Array index 0 must always be ['Languages', 'words'] passed undefined", () => {
    expect(graphData(undefined)[0]).toEqual(["Languages", "words"]);
  });
});
