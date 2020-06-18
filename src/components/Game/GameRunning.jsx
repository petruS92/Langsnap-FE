import React from "react";
import Loading from "../Loading";

export default function GameRunning({
  isLoading,
  transWord,
  associatedWords,
  playGame,
  resetIsStarted,
  openAlert,
  alertMessage,
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
          <div className="gameLabelContainer">
            <p>{transWord}</p>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {openAlert && <h3 className="alertPrimary">{alertMessage}</h3>}
              {associatedWords.map((wordObj) => {
                return (
                  <div key={wordObj}>
                    <input
                      type="radio"
                      id={wordObj}
                      name={wordObj}
                      value={wordObj}
                      onClick={(e) => playGame(e)}
                    />
                    <span>{wordObj}</span>
                  </div>
                );
              })}
            </>
          )}
          <br />
          <button onClick={(e) => resetIsStarted(e)}>Select Language</button>
        </div>
      </div>
    </div>
  );
}
