import React from "react";
import { Link } from "@reach/router";

const NavBar = (props) => {
  const { isLoggedIn } = props;
  return (
    <nav className="nav">
      <li>
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/signup">Sign up</Link>}
        {isLoggedIn && <Link to="/myaccount">My Account</Link>}
        {isLoggedIn && <Link to="/game">Test yourself!</Link>}
        {isLoggedIn && <Link to="/wordslist">My Words</Link>}
      </li>
    </nav>
  );
};

export default NavBar;
