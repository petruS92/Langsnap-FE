import React from "react";

const WordsList = (props) => {
  const {
    words: { German, French, Spanish },
    isLoggedIn,
  } = props;
  console.log(German);
  if (!isLoggedIn) return <h4>Please login</h4>;
  return (
    <section>
      <h3>Words List</h3>
      <h4>German</h4>
      <ul>
        {German.map((wordObject, index) => {
          return (
            <li key={index}>{`${Object.keys(wordObject)} - ${Object.values(
              wordObject
            )}`}</li>
          );
        })}
      </ul>
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

// maybe three seperate lists
// "see more" feature, only shows 5 words until click on button
