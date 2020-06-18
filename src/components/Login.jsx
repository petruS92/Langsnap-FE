import React, { Component } from "react";
import { navigate } from "@reach/router";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import * as api from "../utils/api";

class Login extends Component {
  state = {
    email: "",
    errorMessage: "",
    password: "",
    returnToHomePage: false,
    isLoading: true,
  };

  render() {
    const { email, password, isLoading, errorMessage } = this.state;
    const { handleInputLogin, handleLogInSubmit } = this;

    if (isLoading) return <Loading />;

    return (
      <main className="loginBackground">
        <section className="loginContainer">
          <h1 className="formTitle">langsnap</h1>
          <form className="loginForm" autocomplete="on">
            <p className="formInputContainer">
              <label htmlFor="email" className="formLabel">
                email
              </label>

              <input
                type="text"
                name="email"
                id="signup-email"
                value={email}
                placeholder="Enter email..."
                onChange={handleInputLogin}
                className="formInput"
                required
              />
            </p>

            <p className="formInputContainer">
              <label htmlFor="password" className="formLabel">
                password
              </label>

              <input
                type="password"
                name="password"
                id="signup-password"
                value={password}
                placeholder="Create a password"
                onChange={handleInputLogin}
                className="formInput"
                required
              />
            </p>
          </form>
          {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
        </section>
        <label className="loginLabel">
          <button
            type="submit"
            onClick={handleLogInSubmit}
            className="loginButton"
          >
            Log in
          </button>
        </label>
      </main>
    );
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  componentDidUpdate(previousProps, previousState) {
    const { isLoggedOut } = this.props;
    const userLoggedOut = previousProps.isLoggedOut !== isLoggedOut;
    if (userLoggedOut) {
      this.setState({ returnToHomePage: false });
    }
  }

  handleLogInSubmit = (event) => {
    const { email, password } = this.state;
    const { loggingIn } = this.props;

    event.preventDefault();

    this.setState({ isLoading: true });

    api
      .loginUser(email, password)
      .then((info) => {
        loggingIn(info);
        this.setState({
          email: "",
          password: "",
          isLoading: false,
        });
        navigate(`/`);
      })
      .catch((error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        this.setState({
          email: "",
          password: "",
          errorMessage: message,
          isLoading: false,
        });
      });
  };

  handleInputLogin = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClickReLogin = () => {
    this.setState({ errorMessage: "" });
  };
}

export default Login;
