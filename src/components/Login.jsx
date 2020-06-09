import React, { Component } from "react";
import { Link } from "@reach/router";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isLoading: true,
    returnToHomePage: false,
  };

  handleInputLogin = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogInSubmit = (event) => {
    event.preventDefault();
    this.props.loggingIn();
    this.setState({ email: "", password: "", returnToHomePage: true });
  };

  render() {
    const { email, password, returnToHomePage } = this.state;
    if (returnToHomePage)
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
        {/* <Link to="/"> */}
        <button type="submit">Log in</button>
        {/* </Link> */}
      </form>
    );
  }
}

export default Login;
