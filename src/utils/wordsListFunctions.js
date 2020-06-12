export const selectWords = (words) => {
  let languagesObject = { German: [], French: [], Spanish: [] };
  Object.entries(words).forEach(([key, pairObject]) => {
    const languages = Object.keys(pairObject);
    languagesObject[languages].push(pairObject[languages]);
  });
  return languagesObject;
};

// export const capitaliseGermanWord = (germanTranslation) => {
//   if (germanTranslation.length === 1) {
//     let [germanWord] = germanTranslation;
//     let [germanArticle, germanNoun] = germanWord.split(" ");
//     let correctedGermanWord =
//       germanArticle + " " + (germanNoun[0].toUpperCase() + germanNoun.slice(1));
//     return correctedGermanWord;
//   } else {
//     return "";
//   }
// };

export const filterDuplicatesOut = (englishWord, words) => {
  let objArr = Object.values(words).flat();
  let keysArr = [];
  objArr.forEach((object) => {
    keysArr.push(Object.keys(object));
  });
  let flatKeysArr = keysArr.flat();
  if (!flatKeysArr.includes(englishWord)) {
    return true;
  } else {
    return false;
  }
};

export const correctWord = (word) => {
  return "the " + word.replace(/[^A-Z0-9]+/gi, "");
};
