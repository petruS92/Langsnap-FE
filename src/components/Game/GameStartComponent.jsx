import React from "react";
import "../../StyleSheets/Game.css";

export default function GameStartComponent({
  language,
  handleSelectedLanguage,
  handleStart,
  enoughWordsToPlay,
}) {
  return (
    <div className="gamePageContainer">
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
              onChange={(e) => handleSelectedLanguage(e)}
              default={"German"}
              className="gameLabel"
            >
              <option default value="German">
                German
              </option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
          {/* <br /> */}
          {!enoughWordsToPlay && (
            <div className="errorDisplay">
              <p>Translate more {language} words to play the game!</p>
            </div>
          )}
          <div className="startButtonContainer">
            <button
              onClick={(e) => handleStart(e)}
              disabled={!enoughWordsToPlay}
              className="startButton"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
