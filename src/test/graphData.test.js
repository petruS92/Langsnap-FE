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
/*
   array index 0 needs to ["language", "words"]
   must return an array of arrays that have the languages and the word count
    when no words, just display 0 for each language
   */
//[["Languages", "words"],["French", 4],["German", 8],["Spanish", 0]]

describe("Testing graphData", () => {
  test("Array index 0 must always be ['language', 'words']", () => {
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
  test("Array index 0 must always be ['language', 'words'] nothing passed as an argument", () => {
    expect(graphData()).toEqual([["Languages", "words"]]);
  });
  test("Array index 0 must always be ['language', 'words'] passed an empty object", () => {
    expect(graphData({})).toEqual([["Languages", "words"]]);
  });
  test("Array index 0 must always be ['language', 'words'] passed null", () => {
    expect(graphData(null)).toEqual([["Languages", "words"]]);
  });
  test("Array index 0 must always be ['language', 'words'] passed undefined", () => {
    expect(graphData(undefined)).toEqual([["Languages", "words"]]);
  });
});
