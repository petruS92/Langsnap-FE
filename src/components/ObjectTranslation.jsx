import React, { Component } from "react";
import { Link } from "@reach/router";
import DropDown from "./DropDown";
import AssociatedWords from "./AssociatedWords";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import * as api from "../utils/api";
import * as wordsListFunctions from "../utils/wordsListFunctions";

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

  render() {
    const {
      englishWord,
      staticEnglishWord,
      translatedWord,
      translationLanguage,
      isLoading,
      errorMessage,
    } = this.state;
    const { isLoggedIn } = this.props;
    const { changeLanguage, handleClickTranslate } = this;
    const linkToSignUp = <Link to="/signup">Sign up</Link>;
    const linkToLogIn = <Link to="/login">log in</Link>;

    if (errorMessage) return <ErrorDisplay errorMessage={errorMessage} />;
    console.log("objectTranslation rendered");
    console.log(this.state.translationLanguage);
    return (
      <main className="pageContainer">
        <section className="objectTranslationContainer">
          <div className="videoCanvas">
            {" "}
            <video id="video" autoPlay muted playsInline></video>
            <canvas id="canvas" style={{ display: "none" }}></canvas>
            <h1 className="sentence">{englishWord}</h1>
          </div>
          <>
            <div className="translateButtonContainer">
              <DropDown changeLanguage={changeLanguage} />
              <button
                onClick={handleClickTranslate}
                className="capture"
                disabled={translationLanguage === ""}
              >
                Translate!
              </button>
            </div>
          </>
          {isLoading && <Loading />}
        </section>
        <section className="contentBackground">
          <div className="contentContainer">
            <p className="englishWord">
              {staticEnglishWord || "Press the button to see a..."}
            </p>

            <p className="translation">{translatedWord || "translation"}</p>

            {!isLoggedIn && (
              <p className="homeMessage">
                {linkToSignUp} or {linkToLogIn} to unlock more translations!
              </p>
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
      </main>
    );
  }

  async componentDidMount() {
    const { visualDetection } = this;
    await visualDetection();
    this.setState({ isLoading: false });
  }

  handleClickTranslate = (event) => {
    const { englishWord, translationLanguage } = this.state;
    const { token, words, addNewWordToState } = this.props;
    this.setState({ isClicked: true, isLoading: true });

    api
      .fetchTranslation(englishWord, translationLanguage)
      .then((translatedWord) => {
        this.setState({
          translatedWord: translatedWord,
          staticEnglishWord: englishWord,
          translationLanguage: translationLanguage,
          isClicked: false,
          isLoading: false,
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
        console.dir(error);
        const {
          response: {
            data: { message },
          },
        } = error;
        this.setState({ errorMessage: message });
      });
  };

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

  changeLanguage = (translationLanguage) => {
    this.setState({
      translationLanguage: translationLanguage,
    });
  };
}

export default ObjectTranslation;
