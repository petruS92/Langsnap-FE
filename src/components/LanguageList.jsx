import React from "react";

const LanguageList = (props) => {
  const { selectedDisplayLanguage, selectedDisplayWords } = props;

  return (
    <div>
      <h4>{selectedDisplayLanguage}</h4>
      <ul>
        {selectedDisplayWords.map((wordObject, index) => {
          return (
            <li key={index}>{`${Object.keys(wordObject)} - ${Object.values(
              wordObject
            )}`}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageList;
