import * as wordsListFunctions from "../utils/wordsListFunctions";

describe("Tests for the selectWords function", () => {
  test("It returns the languagesObject with three language keys with empty array values by default when passed an empty object", () => {
    expect(wordsListFunctions.selectWords(null)).toEqual(null);
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

describe("Tests for the filterDuplicatesOut function", () => {
  test("It returns false if the english word is not found in the words array and true if the word is present in the array", () => {
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
          cat: "die Katze",
        },
        {
          car: "das Auto",
        },
      ],
      Spanish: [
        {
          car: "el coche",
        },
      ],
    };
    expect(
      wordsListFunctions.filterDuplicatesOut("Spanish", "suit", inputWords)
    ).toBe(false);
    expect(
      wordsListFunctions.filterDuplicatesOut("French", "cheese", inputWords)
    ).toBe(true);
  });
});

describe("Tests for the orderAssociatedWords function", () => {
  test("It returns an empty array when passed an empty array", () => {
    const input = [];
    const output = [];
    expect(wordsListFunctions.orderAssociatedWords(input)).toEqual(output);
  });
  test("It removes the associated words from the array and transforms them to lower case words", () => {
    const input = [
      [
        { item: "Better", weight: 93, pos: "verb" },
        { item: "File", weight: 44, pos: "verb" },
        { item: "Allege", weight: 27, pos: "verb" },
      ],
      [
        { item: "Admirably", weight: 53, pos: "adverb" },
        { item: "Perfectly", weight: 33, pos: "adverb" },
        { item: "Whenever", weight: 89, pos: "adverb" },
      ],
      [
        { item: "Suited", weight: 13, pos: "adjective" },
        { item: "Tailored", weight: 23, pos: "adjective" },
        { item: "Fancy", weight: 58, pos: "adjective" },
      ],
    ];
    const output = [
      "better",
      "file",
      "allege",
      "admirably",
      "perfectly",
      "whenever",
      "suited",
      "tailored",
      "fancy",
    ];
    expect(wordsListFunctions.orderAssociatedWords(input)).toEqual(output);
  });
});
describe("Tests for the pairAssociatedWords function", () => {
  test("It returns an empty array when passed an empty array", () => {
    const input = [];
    const output = [];
    expect(wordsListFunctions.pairAssociatedWords(input)).toEqual(output);
  });
  test("It creates an array of object, with the key of the english word and the value of the translated word, from two given arrays", () => {
    const englishWords = ["house", "car", "suit"];
    const translatedWords = ["das Haus", "das Auto", "der Anzug"];
    const output = [
      { house: "das Haus" },
      { car: "das Auto" },
      { suit: "der Anzug" },
    ];
    expect(
      wordsListFunctions.pairAssociatedWords(englishWords, translatedWords)
    ).toEqual(output);
  });
});
