import React from "react";
import * as wordsFunctions from "../utils/wordsListFunctions";

const LanguageList = (props) => {
  const { selectedDisplayLanguage, selectedDisplayWords } = props;

  const germanWordsFilter = (word) => {
    if (selectedDisplayLanguage === "German") {
      return wordsFunctions.capitaliseGermanWord(word);
    } else {
      return word;
    }
  };

  return (
    <div>
      <h4>{selectedDisplayLanguage}</h4>
      <ul>
        {selectedDisplayWords.map((wordObject, index) => {
          return (
            <li key={index}>{`${Object.keys(wordObject)} - ${germanWordsFilter(
              Object.values(wordObject)
            )}`}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageList;
