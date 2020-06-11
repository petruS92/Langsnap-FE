import React, { Component } from "react";
import SignUpThankYou from "./SignUpThankYou";
import * as api from "../utils/api";
import Loading from "./Loading";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    userDidSignUp: false,
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleInputSignUpForm = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSignUpSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    api.createUser(name, email, password);
    this.setState({ name: "", email: "", password: "", userDidSignUp: true });
  };

  render() {
    const { userDidSignUp, isLoading } = this.state;
    if (isLoading) return <Loading />;
    if (userDidSignUp)
      return (
        <h5>
          <SignUpThankYou />
        </h5>
      );
    return (
      <section>
        <h5>Sign up!</h5>
        <p>
          Register your details to keep a track of your progress and gain access
          to our exciting game!
        </p>
        <form onSubmit={this.handleSignUpSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="signup-name"
            value={this.state.name}
            placeholder="Enter your name"
            onChange={this.handleInputSignUpForm}
            required
          />
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="signup-email"
            value={this.state.email}
            placeholder="Enter your email"
            onChange={this.handleInputSignUpForm}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="signup-password"
            value={this.state.password}
            placeholder="Create a password"
            onChange={this.handleInputSignUpForm}
            required
          />
          <button type="submit">Register</button>
        </form>
      </section>
    );
  }
}

export default SignUp;
