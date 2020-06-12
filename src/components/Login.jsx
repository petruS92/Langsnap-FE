import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import Loading from "./Loading";

class Login extends Component {
  state = {
    email: "",
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

  handleInputLogin = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogInSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    this.setState({ isLoading: true });
    api.loginUser(email, password).then((info) => {
      this.props.loggingIn(info);
    });
    this.setState({
      email: "",
      password: "",
      returnToHomePage: true,
      isLoading: false,
    });
  };

  render() {
    const { email, password, returnToHomePage, isLoading } = this.state;
    const { isLoggedIn } = this.props;
    if (returnToHomePage && isLoggedIn)
      return (
        <Link to="/">
          <p>Go to homepage</p>
        </Link>
      );
    if (isLoading) return <Loading />;
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
