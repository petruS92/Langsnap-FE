import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";

class Login extends Component {
  state = {
    email: "",
    errorMessage: "",
    password: "",
    returnToHomePage: false,
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  componentDidUpdate(previousProps, previousState) {
    const userLoggedOut = previousProps.isLoggedOut !== this.props.isLoggedOut;
    if (userLoggedOut) {
      this.setState({ returnToHomePage: false });
    }
  }

  handleClickReLogin = () => {
    this.setState({ errorMessage: "" });
  };

  handleInputLogin = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogInSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    this.setState({ isLoading: true });
    api
      .loginUser(email, password)
      .then((info) => {
        this.props.loggingIn(info);
      })
      .catch((error) => {
        console.dir(error);
        const {
          response: {
            data: { message },
          },
        } = error;
        this.setState({ errorMessage: message });
      });
    this.setState({
      email: "",
      password: "",
      returnToHomePage: true,
      isLoading: false,
    });
  };

  render() {
    const {
      email,
      password,
      returnToHomePage,
      isLoading,
      errorMessage,
    } = this.state;
    const { isLoggedIn } = this.props;
    if (isLoading) return <Loading />;

    if (returnToHomePage && isLoggedIn)
      return (
        <Link to="/">
          <p>Go to homepage</p>
        </Link>
      );
    return (
      <div className="loginBackground">
        <div className="loginContainer">
          <h3 className="formTitle">langsnap</h3>
          {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
          <form className="loginForm">
            <div className="formInputContainer">
              <label htmlFor="email"></label>
              <p className="formLabel">email</p>
              <input
                type="text"
                name="email"
                id="signup-email"
                value={email}
                placeholder="Enter email..."
                onChange={this.handleInputLogin}
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
                onChange={this.handleInputLogin}
                className="formInput"
                required
              />
            </div>
          </form>
        </div>
        <label className="loginLabel">
          <button
            type="submit"
            onClick={this.handleLogInSubmit}
            className="loginButton"
          >
            Log in
          </button>
        </label>
      </div>
    );
  }
}

export default Login;
