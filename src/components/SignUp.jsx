import React, { Component } from "react";
import { navigate } from "@reach/router";
import ErrorDisplay from "./ErrorDisplay";
import Loading from "./Loading";
import * as api from "../utils/api";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    userDidSignUp: false,
    errorMessage: "",
    isLoading: true,
  };

  render() {
    const { isLoading, errorMessage, name, email, password } = this.state;
    const { handleInputSignUpForm, handleSignUpSubmit } = this;

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
                value={name}
                placeholder="Enter your name"
                onChange={handleInputSignUpForm}
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
                value={email}
                placeholder="Enter your email"
                onChange={handleInputSignUpForm}
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
                value={password}
                placeholder="Create a password"
                onChange={handleInputSignUpForm}
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
            onClick={handleSignUpSubmit}
            className="loginButton"
          >
            Sign up
          </button>
        </label>
      </section>
    );
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleInputSignUpForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSignUpSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const { loggingIn } = this.props;

    api
      .createUser(name, email, password)
      .then((info) => {
        loggingIn(info);
        navigate(`/`);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          if (message === "The email address is badly formatted.") {
            this.setState({ errorMessage: message });
          } else {
            this.setState({ errorMessage: message });
          }
        }
      );
  };

  handleReSignUp = () => {
    this.setState({ errorMessage: "" });
  };
}

export default SignUp;
