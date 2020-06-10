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

class App extends Component {
  state = {
    email: "",
    name: "",
    words: "",
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

  loggingIn = (info) => {
    const {
      token,
      user: { email, name },
    } = info;
    const arrayOfWords = wordsFunctions.selectWords(info);
    console.log(email, name);
    this.setState({ isLoggedIn: true, words: arrayOfWords, token: token });
  };

  loggingOut = () => {
    this.setState({ isLoggedIn: false, token: null });
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <>
        <NavBar isLoggedIn={isLoggedIn} />
        {isLoggedIn && (
          <Logout isLoggedIn={isLoggedIn} loggingOut={this.loggingOut} />
        )}
        <Router>
          <WordPredict path="/" />
          <SignUp path="/signup" />
          <Login
            path="/login"
            isLoggedIn={isLoggedIn}
            loggingIn={this.loggingIn}
          />
          <MyAccount path="/myaccount" />
        </Router>
      </>
    );
  }
}

export default App;
