import React, { Component } from "react";
import DropDown from "./DropDown";
import * as api from "../utils/api";
import * as wordsListFunctions from "../utils/wordsListFunctions";

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
    /* use the navigate property from reach router to send to a different page; you could throw
      an error to reload the page using the state of the  */

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

  handleClick = (event) => {
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
          const noDuplicates = wordsListFunctions.filterDuplicatesOut(
            englishWord,
            words
          );
          console.log(englishWord);
          console.log(words);
          console.log(noDuplicates);
          if (noDuplicates) {
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
    } = this.state;
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
            onClick={this.handleClick}
            className="capture"
            disabled={isClicked === true}
          >
            Capture me!
          </button>
        )}
        <p className="translation">{translatedWord}</p>
      </div>
    );
  }
}

export default ObjectTranslation;
