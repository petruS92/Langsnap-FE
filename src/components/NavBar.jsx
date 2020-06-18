import { Link } from "@reach/router";
import { slide as Menu } from "react-burger-menu";
import React, { Component } from "react";

export default class NavBar extends Component {
  state = {
    menuOpen: false,
  };

  render() {
    const { isLoggedIn } = this.props;
    const { menuOpen } = this.state;

    return (
      <div className="navContainer">
        <Menu
          isOpen={menuOpen}
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
        <Link to="/" className="appTitleLink">
          <h3 className="appTitle">Langsnap</h3>
        </Link>
      </div>
    );
  }

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
    const { loggingOut } = this.props;
    const { closeMenu } = this;
    loggingOut();
    closeMenu();
  };
}
