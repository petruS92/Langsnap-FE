import { getRandomIndex } from "../utils/getRandomIndex";
// test state for fun..
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

let wordIndex = null;

describe("Testing getRandomIndex", () => {
  test("Returns a number", () => {
    const language = "German";
    expect(typeof getRandomIndex(words, language, wordIndex)).toBe("number");
  });
  //    1/1000 probability test
  test("should not returnsame number twice", () => {
    const language = "German";
    const testArray = [];
    let bool = false;
    for (let i = 0; i < 1000; i++) {
      wordIndex = getRandomIndex(words, language, wordIndex);
      testArray.push(wordIndex);
    }
    testArray.forEach((number, index) => {
      if (number === testArray[index + 1]) {
        return (bool = true);
      }
    });
    expect(bool).toBe(false);
  });
  //    1/1000 probability test
  test("should not return a number longer than the array length", () => {
    const language = "German";
    for (let i = 0; i < 1000; i++) {
      expect(getRandomIndex(words, language, wordIndex)).not.toBeGreaterThan(
        words[language].length
      );
    }
  });
  test("Returns null if passed an empty array", () => {
    const language = "Spanish";
    expect(getRandomIndex(words, language, wordIndex)).toBe(null);
  });
});

// should return number - done
// should not return same number twice --done
// should not return the same number as wordIndex --done
// should not return a number longer than the array length --done
// should return null if passed an empty array...
// should not mutate original words list
// should not mutate original language input
