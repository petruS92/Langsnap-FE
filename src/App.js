import React, { Component } from "react";
import WordPredict from "./components/WordPredict.jsx";
import { Router } from "@reach/router";
import "./App.css";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import setAuthToken from "./utils/authentication";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MyAccount from "./components/MyAccounts.jsx";
import * as wordsFunctions from "./utils/wordsListFunctions";
import WordsList from "./components/WordsList.jsx";

class App extends Component {
  state = {
    email: "",
    name: "",
    words: null,
    token: null,
    isLoggedIn: false,
    isLoading: true,
  };

  componentDidUpdate(previousProps, previousState) {
    const tokenReceived = this.state.token !== previousState.token;
    if (tokenReceived) {
      setAuthToken(this.state.token);
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
    this.setState({ isLoggedIn: false, token: null, email: "", name: "" });
  };

  render() {
    const { isLoggedIn, words, email, name, token } = this.state;
    return (
      <>
        <NavBar isLoggedIn={isLoggedIn} />
        {isLoggedIn && (
          <Logout isLoggedIn={isLoggedIn} loggingOut={this.loggingOut} />
        )}
        <Router>
          <WordPredict
            path="/"
            addNewWordToState={this.addNewWordToState}
            token={token}
            words={words}
          />
          <SignUp path="/signup" />
          <Login
            path="/login"
            isLoggedIn={isLoggedIn}
            loggingIn={this.loggingIn}
          />
          <MyAccount
            path="/myaccount"
            email={email}
            name={name}
            token={token}
          />
          <WordsList path="/wordslist" words={words} isLoggedIn={isLoggedIn} />
        </Router>
      </>
    );
  }
}

export default App;
