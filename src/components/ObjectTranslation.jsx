import React, { Component } from "react";
import DropDown from "./DropDown";
import * as api from "../utils/api";
import * as wordsListFunctions from "../utils/wordsListFunctions";
import AssociatedWords from "./AssociatedWords";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";

class ObjectTranslation extends Component {
  state = {
    errorMessage: "",
    englishWord: "",
    staticEnglishWord: "",
    translatedWord: "",
    translationLanguage: "",
    isClicked: false,
    isLoading: true,
  };

  async componentDidMount() {
    await this.visualDetection();
    this.setState({ isLoading: false });
  }

  visualDetection = async () => {
    const mobileNetModel = await window.mobilenet.load();
    const defaultCanvas = document.getElementById("defaultCanvas");
    const video = document.getElementById("video") || defaultCanvas;
    const canvas = document.getElementById("canvas") || defaultCanvas;
    const context = canvas.getContext("2d");

    const videoStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "environment",
      },
    });
    video.srcObject = videoStream;
    const aiDetection = async () => {
      context.drawImage(video, 0, 0, 500, 500);
      const classification = await mobileNetModel.classify(canvas);
      this.setState({
        englishWord: classification[0].className.split(",")[0],
      });
      setTimeout(() => {
        requestAnimationFrame(aiDetection);
      }, 750);
    };
    aiDetection();
  };

  handleClickTranslate = (event) => {
    const { englishWord, translationLanguage } = this.state;
    const { token, words, addNewWordToState } = this.props;
    this.setState({ isClicked: true });
    const correctedWord = wordsListFunctions.correctWord(englishWord);
    api
      .fetchTranslation(correctedWord, translationLanguage)
      .then((translatedWord) => {
        this.setState({
          translatedWord: translatedWord,
          staticEnglishWord: englishWord,
          translationLanguage: translationLanguage,
          isClicked: false,
        });
        if (token) {
          const Duplicates = wordsListFunctions.filterDuplicatesOut(
            translationLanguage,
            englishWord,
            words
          );

          if (!Duplicates) {
            api
              .updateDatabase(translationLanguage, translatedWord, englishWord)
              .then((updatedWords) => {
                addNewWordToState(updatedWords);
              });
          }
        }
      })
      .catch((error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        this.setState({ errorMessage: message });
      });
  };

  changeLanguage = (translationLanguage) => {
    this.setState({
      translationLanguage: translationLanguage,
    });
  };

  render() {
    const {
      englishWord,
      staticEnglishWord,
      translatedWord,
      isClicked,
      translationLanguage,
      isLoading,
      errorMessage,
    } = this.state;
    const { isLoggedIn } = this.props;
    if (errorMessage) return <ErrorDisplay errorMessage={errorMessage} />;
    return (
      <>
        <div className="objectTranslationContainer">
          <div className="videoCanvas">
            {" "}
            <video id="video" autoPlay muted playsInline></video>
            <canvas
              id="canvas"
              width="300"
              height="300"
              style={{ display: "none" }}
            ></canvas>
            <p className="sentence">{englishWord}</p>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="translateButtonContainer">
                <DropDown changeLanguage={this.changeLanguage} />
                <button
                  onClick={this.handleClickTranslate}
                  className="capture"
                  disabled={isClicked === true}
                >
                  Translate!
                </button>
              </div>
            </>
          )}
        </div>
        <section className="associatedWords">
          <div className="wrapContainer">
            <p className="static">{staticEnglishWord}</p>
            <p className="translation">{translatedWord}</p>
            {!isLoggedIn && (
              <p>Sign up or log in to unlock more translations!</p>
            )}
            {isLoggedIn && translatedWord && (
              <AssociatedWords
                staticEnglishWord={staticEnglishWord}
                translatedWord={translatedWord}
                translationLanguage={translationLanguage}
              />
            )}
          </div>
        </section>
      </>
    );
  }
}

export default ObjectTranslation;
