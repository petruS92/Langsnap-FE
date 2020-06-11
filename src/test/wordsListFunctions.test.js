import * as wordsListFunctions from "../utils/wordsListFunctions";

describe("Tests for the selectWords function", () => {
  test("It returns the languagesObject with three language keys with empty array values by default when passed an empty object", () => {
    expect(wordsListFunctions.selectWords({})).toEqual({
      German: [],
      French: [],
      Spanish: [],
    });
  });
  test("It converts the words object from the user information into the languagesObject object with three language keys", () => {
    const words = {
      M9SFPdhOMcZ61ENeFLw: {
        German: {
          cat: "die katze",
        },
      },
      M9XQUYPuXUhz4zIg7Pn: {
        French: {
          cheese: "la fromage",
        },
      },
      M9XQWnF40tsIZDqjLtq: {
        French: {
          cat: "le chat",
        },
      },
      M9XQgNCJF6pDbFVeS2b: {
        French: {
          car: "la voiture",
        },
      },
      M9XQufzTm0_2hVqjau1: {
        Spanish: {
          car: "el coche",
        },
      },
    };
    const selectWordsOutput = {
      French: [
        {
          cheese: "la fromage",
        },
        {
          cat: "le chat",
        },
        {
          car: "la voiture",
        },
      ],
      German: [
        {
          cat: "die katze",
        },
      ],
      Spanish: [
        {
          car: "el coche",
        },
      ],
    };
    expect(wordsListFunctions.selectWords(words)).toEqual(selectWordsOutput);
  });
  test("The output of the function has a different reference from the input object", () => {
    const words = {
      M9SFPdhOMcZ61ENeFLw: {
        German: {
          cat: "die katze",
        },
      },
      M9XQUYPuXUhz4zIg7Pn: {
        French: {
          cheese: "la fromage",
        },
      },
      M9XQWnF40tsIZDqjLtq: {
        French: {
          cat: "le chat",
        },
      },
      M9XQgNCJF6pDbFVeS2b: {
        French: {
          car: "la voiture",
        },
      },
      M9XQufzTm0_2hVqjau1: {
        Spanish: {
          car: "el coche",
        },
      },
    };
    const selectWordsOutput = {
      French: [
        {
          cheese: "la fromage",
        },
        {
          cat: "le chat",
        },
        {
          car: "la voiture",
        },
      ],
      German: [
        {
          cat: "die katze",
        },
      ],
      Spanish: [
        {
          car: "el coche",
        },
      ],
    };
    expect(wordsListFunctions.selectWords(words)).not.toBe(selectWordsOutput);
  });
});

describe("Tests for the capitaliseGermanWord function", () => {
  test("It capitalises the German noun without changing the article and returns a string", () => {
    expect(wordsListFunctions.capitaliseGermanWord(["die katze"])).toBe(
      "die Katze"
    );
  });
  test("It return an empty string if mistakenly passed two words", () => {
    expect(
      wordsListFunctions.capitaliseGermanWord(["die katze", "die katze"])
    ).toBe("");
  });
  test("It returns an empty string if passed an empty array", () => {
    expect(wordsListFunctions.capitaliseGermanWord([])).toBe("");
  });
});

describe("Tests for the filterDuplicatesOut function", () => {
  test("It returns true if the english word is not found in the words array and false if the word is present in the array", () => {
    const inputWords = {
      French: [
        {
          cheese: "la fromage",
        },
        {
          cat: "le chat",
        },
        {
          car: "la voiture",
        },
      ],
      German: [
        {
          cat: "die katze",
        },
      ],
      Spanish: [
        {
          car: "el coche",
        },
      ],
    };
    expect(wordsListFunctions.filterDuplicatesOut("suit", inputWords)).toBe(
      true
    );
    expect(wordsListFunctions.filterDuplicatesOut("cheese", inputWords)).toBe(
      false
    );
  });
});
