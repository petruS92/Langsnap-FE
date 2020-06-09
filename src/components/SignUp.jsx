import React, { Component } from "react";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    userDidSignUp: false,
  };

  handleInputSignUpForm = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSignUpSubmit = (event) => {
    const { name, email, password } = this.state;
    // api.createUser();
    console.log(name, email, password);
    this.setState({ userDidSignUp: true });
  };

  render() {
    const { userDidSignUp } = this.state;
    if (userDidSignUp) return <h4>Thank you for signing up</h4>;
    return (
      <section>
        <h4>Sign up!</h4>
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
          <button type="">Register</button>
        </form>
      </section>
    );
  }
}

export default SignUp;
