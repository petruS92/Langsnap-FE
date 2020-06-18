import React, { Component } from "react";
import SignUpThankYou from "./SignUpThankYou";
import * as api from "../utils/api";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import { Link, navigate } from "@reach/router";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    userDidSignUp: false,
    errorMessage: "",
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleReSignUp = () => {
    this.setState({ errorMessage: "" });
  };

  handleInputSignUpForm = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSignUpSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    api
      .createUser(name, email, password)
      .then((info) => {
        this.props.loggingIn(info);
        navigate(`/`);
      })
      .catch((error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        if (message === "The email address is badly formatted.") {
          this.setState({ errorMessage: message });
        } else {
          this.setState({ errorMessage: message });
        }
      });
  };

  render() {
    const { userDidSignUp, isLoading, errorMessage } = this.state;
    if (isLoading) return <Loading />;
    return (
      <section className="loginBackground">
        <div className="loginContainer">
          <h3 className="signUpFormTitle">langsnap</h3>
          {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
          <form className="signUpForm">
            <div className="formInputContainer">
              <label htmlFor="name"></label>
              <p className="formLabel">name</p>
              <input
                type="text"
                name="name"
                id="signup-name"
                value={this.state.name}
                placeholder="Enter your name"
                onChange={this.handleInputSignUpForm}
                className="formInput"
                required
              />
            </div>

            <div className="formInputContainer">
              <label htmlFor="email"></label>
              <p className="formLabel">email</p>
              <input
                type="text"
                name="email"
                id="signup-email"
                value={this.state.email}
                placeholder="Enter your email"
                onChange={this.handleInputSignUpForm}
                className="formInput"
                required
              />
            </div>

            <div className="formInputContainer">
              <label htmlFor="password"></label>
              <p className="formLabel">password</p>
              <input
                type="password"
                name="password"
                id="signup-password"
                value={this.state.password}
                placeholder="Create a password"
                onChange={this.handleInputSignUpForm}
                className="formInput"
                required
              />
            </div>
          </form>
          <p className="loginNotes">
            Sign up to keep track of your progress and gain access to extra
            features
          </p>
        </div>
        <label className="loginLabel">
          <button
            type="submit"
            onClick={this.handleSignUpSubmit}
            className="loginButton"
          >
            Sign up
          </button>
        </label>
      </section>
    );
  }
}

export default SignUp;
