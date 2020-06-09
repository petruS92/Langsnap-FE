import React, { Component } from "react";
import WordPredict from "./components/WordPredict.jsx";
import { Router } from "@reach/router";
import "./App.css";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Router>
          <WordPredict path="/" />
          <SignUp path="/signup" />
        </Router>
      </>
    );
  }
}

export default App;
