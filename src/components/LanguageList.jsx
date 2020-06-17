import React from "react";

const LanguageList = (props) => {
  const { selectedDisplayWords } = props;

  return (
    <div>
      <ul className="langList">
        {selectedDisplayWords.map((wordObject, index) => {
          return (
            <li key={index} className="langListItem">{`${Object.keys(
              wordObject
            )} - ${Object.values(wordObject)}`}</li>
          );
        }) || "Please translate words to view your words."}
      </ul>
    </div>
  );
};

export default LanguageList;
