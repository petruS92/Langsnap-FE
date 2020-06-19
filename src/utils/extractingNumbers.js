export const extractingNumbers = (words) => {
  if (!words) return 10;
  const flattenedArray = words.flat([1]);
  const languageNumbers = flattenedArray.filter((item) => {
    return typeof item === "number";
  });
  return Math.max(...languageNumbers) + 5;
};
