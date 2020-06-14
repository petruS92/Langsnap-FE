import React, { Component } from "react";
import DropDown from "./DropDown";
import * as api from "../utils/api";
import * as wordsListFunctions from "../utils/wordsListFunctions";
import AssociatedWords from "./AssociatedWords";

class ObjectTranslation extends Component {
  state = {
    englishWord: "",
    staticEnglishWord: "",
    translatedWord: "",
    translationLanguage: "",
    isClicked: false,
  };

  componentDidMount() {
    this.visualDetection();
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
      }, 500);
    };

    aiDetection();
  };

  handleClickTranslate = (event) => {
    const { englishWord, translationLanguage } = this.state;
    const { token, words, addNewWordToState } = this.props;
    this.setState({ isClicked: true });
    api
      .fetchTranslation(englishWord, translationLanguage)
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
    } = this.state;
    const { isLoggedIn } = this.props;
    return (
      <div>
        <video id="video" autoPlay muted playsInline></video>
        <canvas
          id="canvas"
          width="500"
          height="500"
          style={{ display: "none" }}
        ></canvas>
        <p className="sentence">Your word is going to be {englishWord}</p>
        <DropDown changeLanguage={this.changeLanguage} />
        <p className="static">{staticEnglishWord}</p>
        {this.state.translationLanguage !== "" && (
          <button
            onClick={this.handleClickTranslate}
            className="capture"
            disabled={isClicked === true}
          >
            Translate!
          </button>
        )}
        <p className="translation">{translatedWord}</p>
        {!isLoggedIn && <p>Sign up or log in to unlock more translations!</p>}
        {translatedWord && (
          <AssociatedWords
            staticEnglishWord={staticEnglishWord}
            translatedWord={translatedWord}
            translationLanguage={translationLanguage}
          />
        )}
      </div>
    );
  }
}

export default ObjectTranslation;
