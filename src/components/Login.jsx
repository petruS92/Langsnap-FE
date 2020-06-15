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
    if (errorMessage)
      return (
        <section>
          <ErrorDisplay errorMessage={errorMessage} />
          <button onClick={this.handleClickReLogin}>Login again</button>
        </section>
      );
    if (returnToHomePage && isLoggedIn)
      return (
        <Link to="/">
          <p>Go to homepage</p>
        </Link>
      );
    return (
      <form onSubmit={this.handleLogInSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="signup-email"
          value={email}
          placeholder="Enter email..."
          onChange={this.handleInputLogin}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="signup-password"
          value={password}
          placeholder="Create a password"
          onChange={this.handleInputLogin}
          required
        />
        <button type="submit">Log in</button>
      </form>
    );
  }
}

export default Login;
