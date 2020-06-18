import React, { Component } from "react";
import ObjectTranslation from "./components/ObjectTranslation";
import { Router } from "@reach/router";
import "./StyleSheets/App.css";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import setAuthToken from "./utils/authentication";
import Login from "./components/Login";
import MyAccount from "./components/MyAccounts";
import * as wordsFunctions from "./utils/wordsListFunctions";
import WordsList from "./components/WordsList";
import Loading from "./components/Loading";
import Game from "./components/Game/Game";
import ErrorDisplay from "./components/ErrorDisplay";

class App extends Component {
  state = {
    email: "",
    name: "",
    words: null,
    token: null,
    isLoggedIn: false,
    isLoggedOut: false,
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  componentDidUpdate(previousProps, previousState) {
    const { token } = this.state;
    const tokenReceived = this.state.token !== previousState.token;
    if (tokenReceived) {
      setAuthToken(token);
    }
  }

  addNewWordToState = (updatedWords) => {
    const arrayUpdatedWords = wordsFunctions.selectWords(updatedWords);
    this.setState({ words: arrayUpdatedWords });
  };

  loggingIn = (info) => {
    const {
      token,
      user: { email, name, words },
    } = info;
    const arrayOfWords = wordsFunctions.selectWords(words);

    this.setState({
      isLoggedIn: true,
      words: arrayOfWords,
      token: token,
      name: name,
      email: email,
    });
  };

  loggingOut = () => {
    this.setState({
      isLoggedIn: false,
      token: null,
      email: "",
      name: "",
      isLoggedOut: true,
    });
  };

  render() {
    const {
      isLoggedIn,
      words,
      email,
      name,
      token,
      isLoggedOut,
      isLoading,
    } = this.state;
    if (isLoading) return <Loading />;
    return (
      <section className="appHomeContainer">
        <NavBar isLoggedIn={isLoggedIn} loggingOut={this.loggingOut} />

        <Router>
          <ObjectTranslation
            path="/"
            addNewWordToState={this.addNewWordToState}
            isLoggedIn={isLoggedIn}
            token={token}
            words={words}
          />
          <SignUp path="/signup" loggingIn={this.loggingIn} />
          <Login
            path="/login"
            isLoggedIn={isLoggedIn}
            isLoggedOut={isLoggedOut}
            loggingIn={this.loggingIn}
          />
          <MyAccount
            path="/myaccount"
            email={email}
            name={name}
            token={token}
            words={words}
          />
          <WordsList path="/wordslist" words={words} isLoggedIn={isLoggedIn} />
          <Game
            path="/game"
            words={words}
            name={name}
            isLoggedIn={isLoggedIn}
          />
          <ErrorDisplay isLoggedIn={isLoggedIn} default />
        </Router>
      </section>
    );
  }
}

export default App;
