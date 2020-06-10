export const selectWords = (info) => {
  const {
    user: { words },
  } = info;
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
