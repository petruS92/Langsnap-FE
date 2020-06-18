import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import ObjectTranslation from "./components/ObjectTranslation";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import setAuthToken from "./utils/authentication";
import Login from "./components/Login";
import MyAccount from "./components/MyAccounts";
import UserWordsCard from "./components/UserWordsCard";
import Loading from "./components/Loading";
import Game from "./components/Game/Game";
import ErrorDisplay from "./components/ErrorDisplay";
import * as wordsListFunctions from "./utils/wordsListFunctions";

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
    const { loggingIn, loggingOut, addNewWordToState } = this;

    if (isLoading) return <Loading />;

    return (
      <section className="appHomeContainer">
        <NavBar isLoggedIn={isLoggedIn} loggingOut={loggingOut} />

        <Router>
          <ObjectTranslation
            path="/"
            addNewWordToState={addNewWordToState}
            isLoggedIn={isLoggedIn}
            token={token}
            words={words}
          />
          <SignUp path="/signup" loggingIn={loggingIn} />
          <Login
            path="/login"
            isLoggedIn={isLoggedIn}
            isLoggedOut={isLoggedOut}
            loggingIn={loggingIn}
          />
          <MyAccount
            path="/myaccount"
            email={email}
            name={name}
            token={token}
            words={words}
          />
          <UserWordsCard
            path="/wordslist"
            words={words}
            isLoggedIn={isLoggedIn}
          />
          <Game path="/game" words={words} name={name} />
          <ErrorDisplay isLoggedIn={isLoggedIn} default />
        </Router>
      </section>
    );
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  componentDidUpdate(previousProps, previousState) {
    const { token } = this.state;
    const tokenReceived = token !== previousState.token;
    if (tokenReceived) {
      setAuthToken(token);
    }
  }

  loggingIn = (info) => {
    const {
      token,
      user: { email, name, words },
    } = info;
    const arrayOfWords = wordsListFunctions.selectWords(words);

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

  addNewWordToState = (updatedWords) => {
    const arrayUpdatedWords = wordsListFunctions.selectWords(updatedWords);
    this.setState({ words: arrayUpdatedWords });
  };
}

export default App;
