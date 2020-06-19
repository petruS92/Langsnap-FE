import React, { Component } from "react";
import GameStartComponent from "./GameStartComponent";
import GameRunning from "./GameRunning";
import LoginAlert from "../LoginAlert";
import * as api from "../../utils/api";
import { getRandomIndex } from "../../utils/getRandomIndex";

export default class Game extends Component {
  state = {
    language: "German",
    associatedWords: [],
    word: "",
    errorMessage: "",
    transWord: "",
    wordIndex: null,
    isLoading: false,
    isStarted: false,
    openAlert: false,
    alertMessage: null,
  };

  render() {
    const { name, words, isLoggedIn } = this.props;
    const {
      word,
      associatedWords,
      transWord,
      isLoading,
      isStarted,
      language,
      openAlert,
      alertMessage,
    } = this.state;
    const { playGame, changeIsStarted, handleSelectedLanguage } = this;

    if (isLoggedIn === false) return <LoginAlert />;
    let enoughWordsToPlay;
    if (!words) {
      enoughWordsToPlay = false;
    } else {
      enoughWordsToPlay = words[language].length >= 3;
    }
    return (
      <>
        {isStarted ? (
          <GameRunning
            isLoading={isLoading}
            transWord={transWord}
            associatedWords={associatedWords}
            word={word}
            playGame={playGame}
            resetIsStarted={changeIsStarted}
            openAlert={openAlert}
            alertMessage={alertMessage}
          />
        ) : (
          <GameStartComponent
            name={name}
            language={language}
            handleSelectedLanguage={handleSelectedLanguage}
            handleStart={changeIsStarted}
            enoughWordsToPlay={enoughWordsToPlay}
          />
        )}
      </>
    );
  }

  componentDidMount = () => {
    const { words } = this.props;
    if (words) {
      this.getWord();
    } else {
      this.setState({ isLoading: true });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { word, language, alertMessage } = this.state;
    const { getAssociatedWords, getWord, onTimeout } = this;

    if (prevState.word !== word) {

      
      getAssociatedWords();
    }

    if (prevState.language !== language) {

      getWord();
    }

    if (alertMessage !== null) {
    
      onTimeout();
    }
  };

  getWord = async() => {
    const { words } = this.props;
    const { language, wordIndex } = this.state;
    const randomIndex = await getRandomIndex(words, language, wordIndex);
    let word;
    let transWord;

    if (words && randomIndex !== 'no words') {

      word = `${Object.keys(words[language][randomIndex])}`;
      transWord = `${Object.values(words[language][randomIndex])}`;
    }

  

    this.setState((currentState) => {
      return {
        word: word,
        transWord: transWord,
        isLoading: !currentState.isLoading,
        wordIndex: randomIndex,
        openAlert: false,
        alertMessage: null,
      };
    });
  };

  getAssociatedWords = () => {
    const { word } = this.state;
    const body = {
      text: word,
      lang: "en",
    };

    if (word) {
      api
        .fetchGameWords(body)
        .then((wordsArray) => {
          this.setState({
            associatedWords: [...wordsArray],
            isLoading: false,
          });
        })
        .catch((error) => {
          const {
            response: {
              data: { message },
            },
          } = error;
          this.setState({ errorMessage: message });
        });
    }
  };

  onTimeout = () => {
    const { getWord } = this;

    setTimeout(() => {
      getWord();
    }, 2000);
  };

  handleSelectedLanguage = ({ target }) => {
    const { value } = target;
    this.setState({ language: value });
  };

  playGame = ({ target }) => { 
    const { word } = this.state;
    const idTarget = target.id.toLowerCase();
console.log('play game');

    if (idTarget === word) {
      this.setState({
        openAlert: true,
        alertMessage: `${idTarget} well done!`,
      });
    } else {
      this.setState({
        openAlert: true,
        alertMessage: `${idTarget} wrong!`,
      });
    }
  };

  changeIsStarted = (reset) => {
    if (reset) {
 
      
      this.setState((currentState) => {
        return { language: "German", isStarted: !currentState.isStarted };
      });
    } else {
      this.setState((currentState) => {
      
        return { isStarted: !currentState.isStarted };
      });
    }
  };
}
