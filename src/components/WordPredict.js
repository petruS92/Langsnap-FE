import React, { Component } from "react";
import * as api from "../utils/api";

class WordPredict extends Component {
  state = {
    englishWord: "",
    staticEnglishWord: "",
    translatedWord: "",
  };

  componentDidMount() {
    this.visualDetection();
  }

  visualDetection = async () => {
    const mobileNetModel = await window.mobilenet.load();
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
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

      const predictions = await mobileNetModel.classify(canvas);
      this.setState({ englishWord: predictions[0].className.split(",")[0] });

      requestAnimationFrame(aiDetection);
    };
    aiDetection();
  };

  handleClick = (event) => {
    const { englishWord } = this.state;

    api.seeTranslation(englishWord, "de").then((translatedWord) => {
      this.setState({
        translatedWord: translatedWord,
        staticEnglishWord: englishWord,
      });
    });
  };

  render() {
    const { englishWord, staticEnglishWord, translatedWord } = this.state;
    return (
      <div>
        <h4>This is the WordPredict Component</h4>
        <video id="video" autoPlay muted playsInline></video>
        <canvas
          id="canvas"
          width="500"
          height="500"
          style={{ display: "none" }}
        ></canvas>
        <p className="sentence">Your word is going to be {englishWord}</p>
        <p className="static">{staticEnglishWord}</p>
        <button onClick={this.handleClick} className="capture">
          Capture me!
        </button>
        <p className="translation">{translatedWord}</p>
      </div>
    );
  }
}

export default WordPredict;
