import React, { Component } from "react";
import GameStartComponent from "./GameStartComponent";
import GameRunning from "./GameRunning";
import * as api from "../../utils/api";
import ErrorDisplay from "../ErrorDisplay";
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

  componentDidMount = () => {
    const { words } = this.props;
    if (words) {
      console.dir(words);
      this.getWord();
    } else {
      this.setState({ isLoading: true });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.word !== this.state.word) {
      this.getAssociatedWords();
    }

    if (prevState.language !== this.state.language) {
      this.getWord();
    }

    if (this.state.alertMessage !== null) {
      this.onTimeout();
    }
  };

  onTimeout = () => {
    setTimeout(() => {
      this.getWord();
    }, 2000);
  };

  // const { words } = ;
  // const { language } = this.state;
  // Extract to utils?

  callOnce = () => {
    const { words } = this.props;
    const { language, wordIndex } = this.state;
    getRandomIndex(words, language, wordIndex);
  };

  getWord = () => {
    const { words } = this.props;
    const { language, wordIndex } = this.state;
    const randomIndex = getRandomIndex(words, language, wordIndex);
    let word;
    let transWord;
    let newWord;
    if (words) {
      word = `${Object.keys(words[language][randomIndex])}`;
      transWord = `${Object.values(words[language][randomIndex])}`;
      newWord = word.slice(4, word.length);
    }

    this.setState((currentState) => {
      return {
        word: newWord,
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
    api
      .fetchGameWords(body)
      .then((wordsArray) => {
        console.log(wordsArray);
        this.setState((currentState) => {
          return {
            associatedWords: [...wordsArray],
            isLoading: !currentState.isLoading,
          };
        });
      })
      .catch((error) => {
        console.dir(error);

        const {
          response: {
            data: { message },
          },
        } = error;
        this.setState({ errorMessage: message });
      });
  };

  handleSelectedLanguage = ({ target }) => {
    const { value } = target;
    this.setState({ language: value });
  };

  playGame = ({ target }) => {
    const idTarget = target.id.toLowerCase();
    if (idTarget === this.state.word) {
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

  changeIsStarted = () => {
    this.setState((currentState) => {
      return { isStarted: !currentState.isStarted };
    });
  };

  render() {
    const { name } = this.props;
    const {
      word,
      associatedWords,
      transWord,
      isLoading,
      isStarted,
      language,
      openAlert,
      alertMessage,
      errorMessage,
    } = this.state;
    const { words, isLoggedIn } = this.props;
    if (isLoggedIn === false) return <h4>Please login</h4>;
    let enoughWordsToPlay;
    if (!words) {
      enoughWordsToPlay = false;
    } else {
      enoughWordsToPlay = words[language].length >= 2;
    }
    return (
      <div>
        {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
        {isStarted ? (
          <GameRunning
            isLoading={isLoading}
            transWord={transWord}
            associatedWords={associatedWords}
            word={word}
            playGame={this.playGame}
            resetIsStarted={this.changeIsStarted}
            openAlert={openAlert}
            alertMessage={alertMessage}
          />
        ) : (
          <GameStartComponent
            name={name}
            language={language}
            handleSelectedLanguage={this.handleSelectedLanguage}
            handleStart={this.changeIsStarted}
            enoughWordsToPlay={enoughWordsToPlay}
          />
        )}
      </div>
    );
  }
}

// displaying same word twice..
// component updating errors mystery bug.

//Refactor at some point.
// sort array destructuring / data manipulation.
