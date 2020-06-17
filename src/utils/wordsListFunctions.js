export const selectWords = (words) => {
  if (!words) {
    return null;
  }
  const languagesObject = { German: [], French: [], Spanish: [] };
  Object.entries(words).forEach(([key, pairObject]) => {
    const languages = Object.keys(pairObject);
    languagesObject[languages].push(pairObject[languages]);
  });
  return languagesObject;
};

export const filterDuplicatesOut = (
  translationLanguage,
  englishWord,
  words
) => {
  let bool = false;
  if (words === null) {
    bool = false;
  } else {
    const translationWords = words[translationLanguage];
    for (let prop in translationWords) {
      if (`${Object.keys(translationWords[prop])}` === englishWord) {
        bool = true;
      }
    }
  }
  return bool;
};

export const orderAssociatedWords = (associationsList) => {
  return associationsList
    .flat()
    .map((wordObject) => wordObject.item.toLowerCase());
};

export const pairAssociatedWords = (englishWords, translatedWords) => {
  let newArr = [];
  englishWords.forEach((word, index) =>
    newArr.push({ [englishWords[index]]: translatedWords[index] })
  );
  return newArr;
};
