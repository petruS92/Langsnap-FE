exports.getRandomIndex = (words, language, wordIndex) => {
  let wordsLength;
  if (words) {
    wordsLength = words[language].length -1;
  }

  if (wordsLength <= 0) return "no words";

  let randomListItem = Math.floor(Math.random() * wordsLength);
  if (randomListItem === wordIndex) {
    wordIndex === 0 ? randomListItem++ : randomListItem--;
  }
  if (wordsLength <= 1) {
    randomListItem = 0;
  }
    return randomListItem;
};


