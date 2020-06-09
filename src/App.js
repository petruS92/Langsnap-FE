import React, { Component } from "react";
import WordPredict from "./components/WordPredict.jsx";
import { Router } from "@reach/router";
import "./App.css";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import setAuthToken from "./utils/authentication";

class App extends Component {
  state = {
    token: "",
    isLoading: true,
  };

  componentDidUpdate(previousProps, previousState) {
    if (this.state.token !== previousState.token) {
      setAuthToken(this.state.token);
    }
  }

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
