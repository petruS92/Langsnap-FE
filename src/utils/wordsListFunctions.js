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
