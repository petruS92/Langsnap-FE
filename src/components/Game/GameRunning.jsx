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
    <div>
      <p>{transWord}</p>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {openAlert && <h3>{alertMessage}</h3>}
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
  );
}
