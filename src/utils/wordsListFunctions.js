export const selectWords = (words) => {
  let languagesObject = { German: [], French: [], Spanish: [] };

  Object.entries(words).forEach(([key, pairObject]) => {
    const languages = Object.keys(pairObject);
    languagesObject[languages].push(pairObject[languages]);
  });

  return languagesObject;
};

export const capitaliseGermanWord = (germanTranslation) => {
  let [germanWord] = germanTranslation;

  let [germanArticle, germanNoun] = germanWord.split(" ");

  let correctedGermanWord =
    germanArticle + " " + (germanNoun[0].toUpperCase() + germanNoun.slice(1));
  return correctedGermanWord;
};

export const filterDuplicatesOut = (translatedWord, words) => {
  let objArr = Object.values(words).flat();
  let keysArr = [];
  objArr.forEach((object) => {
    keysArr.push(Object.keys(object));
  });
  let flatKeysArr = keysArr.flat();
  let wordKey = Object.keys(translatedWord)[0];
  if (!flatKeysArr.includes(wordKey)) {
    return true;
  } else {
    return false;
  }
};
