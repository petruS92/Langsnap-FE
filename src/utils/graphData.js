export const graphData = (words) => {
  if (!words)
    return [
      ["Languages", "words"],
      ["Please add words to see your progress", 0],
    ];
  const returnArray = [];
  returnArray.push(["Languages", "words"]);
  for (let i in words) {
    returnArray.push([i, words[i].length]);
  }
  return returnArray;
};
