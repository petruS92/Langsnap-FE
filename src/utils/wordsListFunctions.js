export const selectWords = (words) => {
  if (!words) {
    return [];
  }
  const languagesObject = { German: [], French: [], Spanish: [] };
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

export const correctWord = (word) => {
  return "the " + word.replace(/[^A-Z0-9]+/gi, "");
};

export const filterDuplicatesOut = (
  translationLanguage,
  englishWord,
  words
) => {
  const translationWords = words[translationLanguage];
  let bool = false;
  for (let prop in translationWords) {
    if (`${Object.keys(translationWords[prop])}` === correctWord(englishWord)) {
      bool = true;
    }
  }
  return bool;
};
