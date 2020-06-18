import { Link } from "@reach/router";
import { slide as Menu } from "react-burger-menu";
import React, { Component } from "react";

export default class NavBar extends Component {
  state = {
    menuOpen: false,
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  showSettings(event) {
    event.preventDefault();
  }

  handleLogout = (event) => {
    this.props.loggingOut();
    this.closeMenu();
  };

  render() {
    const { isLoggedIn } = this.props;
    let linkToHome = <Link to="/">Langsnap</Link>;
    return (
      <div className="navContainer">
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
          width={"60%"}
        >
          <Link to="/" onClick={() => this.closeMenu()}>
            Home
          </Link>
          {!isLoggedIn && (
            <Link to="/login" onClick={() => this.closeMenu()}>
              Log in
            </Link>
          )}

          {!isLoggedIn && (
            <Link to="/signup" onClick={() => this.closeMenu()}>
              Sign up
            </Link>
          )}

          {isLoggedIn && (
            <Link to="/wordslist" onClick={() => this.closeMenu()}>
              Words
            </Link>
          )}

          {isLoggedIn && (
            <Link to="/game" onClick={() => this.closeMenu()}>
              Test
            </Link>
          )}

          {isLoggedIn && (
            <Link to="/myaccount" onClick={() => this.closeMenu()}>
              Account
            </Link>
          )}

          {isLoggedIn && (
            <Link to="/" onClick={() => this.handleLogout()}>
              Log out
            </Link>
          )}
        </Menu>
        <h3 className="appTitle">{linkToHome}</h3>
      </div>
    );
  }
}
