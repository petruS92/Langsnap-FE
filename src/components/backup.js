import React from "react";
import * as wordsFunctions from "../utils/wordsListFunctions";

const WordsList = (props) => {
  const {
    words: { German, French, Spanish },
    isLoggedIn,
  } = props;

  if (!isLoggedIn) return <h4>Please login</h4>;

  return (
    <section>
      <h3>Words List</h3>
      <button>German</button>
      {German.map((wordObject, index) => {
        return (
          <li key={index}>{`${Object.keys(
            wordObject
          )} - ${wordsFunctions.capitaliseGermanWord(
            Object.values(wordObject)
          )}`}</li>
        );
      })}
      <h4>French</h4>
      <ul>
        {French.map((wordObject, index) => {
          return (
            <li key={index}>{`${Object.keys(wordObject)} - ${Object.values(
              wordObject
            )}`}</li>
          );
        })}
      </ul>
      <h4>Spanish</h4>
      <ul>
        {Spanish.map((wordObject, index) => {
          return (
            <li key={index}>{`${Object.keys(wordObject)} - ${Object.values(
              wordObject
            )}`}</li>
          );
        })}
      </ul>
    </section>
  );
};

export default WordsList;

// German button, onClick, display german words
// Spanish button, onClick, display spanish words
// French button, onClick, display french words

/* <ul>
  {German.map((wordObject, index) => {
    return (
      <li key={index}>{`${Object.keys(wordObject)} - ${Object.values(
        wordObject
      )}`}</li>
    );
  })}
</ul> */
