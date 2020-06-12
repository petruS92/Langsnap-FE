import React from "react";
// import * as wordsListFunctions from "../utils/wordsListFunctions";

const LanguageList = (props) => {
  const { selectedDisplayLanguage, selectedDisplayWords } = props;
  // Take out the comments until the translator can accept the English article;
  // const germanWordsFilter = (word) => {
  //   if (selectedDisplayLanguage === "German") {
  //     return wordsListFunctions.capitaliseGermanWord(word);
  //   } else {
  //     return word;
  //   }
  // };

  return (
    <div>
      <h4>{selectedDisplayLanguage}</h4>
      <ul>
        {selectedDisplayWords.map((wordObject, index) => {
          return (
            <li key={index}>{`${Object.keys(wordObject)} - ${
              // germanWordsFilter(
              Object.values(wordObject)
              // )
            }`}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageList;
