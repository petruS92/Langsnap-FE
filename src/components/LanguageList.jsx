import React from "react";
import * as wordsFunctions from "../utils/wordsListFunctions";
const LanguageList = (props) => {
  const { selectedDisplayLanguage, selectedDisplayWords } = props;
  return (
    <div>
      <h4>{selectedDisplayLanguage}</h4>
    </div>
  );
};

export default LanguageList;
