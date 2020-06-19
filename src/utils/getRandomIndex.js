exports.getRandomIndex = (words, language, wordIndex) => {
  let wordsLength;
  if (words) {
    wordsLength = words[language].length;
  }

  if (wordsLength === 0) return null;

  let randomListItem = Math.floor(Math.random() * wordsLength);
  if (randomListItem === wordIndex) {
    randomListItem === wordsLength ? randomListItem-- : randomListItem++;
  }
  if (wordsLength <= 1) {
    randomListItem = 0;
  }
  return randomListItem;
};
