import React from "react";

export default function GameStartComponent({
  language,
  handleSelectedLanguage,
  handleStart,
  enoughWordsToPlay,
}) {
  return (
    <div className="pageContainer">
      <div className="titleBackground">
        <div className="titleContainer">
          <h3 className="titleHeader">Test</h3>
        </div>
      </div>

      <div className="contentBackground">
        <div className="contentContainer">
          <label htmlFor="languages" className="gameInputContainer">
            Choose a language...{" "}
          </label>

          <div className="gameLabelContainer">
            <select
              name="languages"
              onChange={(event) => handleSelectedLanguage(event)}
              default={"German"}
              className="gameLabel"
            >
              <option default value="German">
                German
              </option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
            <span
              role="img"
              aria-label="select-arrow"
              className="dropDownArrowTest"
            >
              ▼
            </span>
          </div>
          {/* <br /> */}
          {!enoughWordsToPlay && (
            <div className="errorDisplay">
              <p>Translate more {language} words to play the game!</p>
            </div>
          )}
          <div className="startButtonContainer">
            <button
              onClick={() => handleStart()}
              disabled={!enoughWordsToPlay}
              className="startButton"
            >
              Start
            </button>
          </div>
            <p className="gameplayMessage">
            Pick the english word from the choices and match the random translated word from your learned words!
              </p>
        </div>
      </div>
    </div>
  );
}
