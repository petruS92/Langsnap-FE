import React from "react";
import { Link } from "@reach/router";

const NavBar = () => {
  return (
    <nav className="nav">
      <li>
        <Link to="/">Home</Link>
        <Link to="/login">Login/Logout</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/myaccount">My Account</Link>
        <Link to="/game">Test yourself!</Link>
      </li>
    </nav>
  );
};

export default NavBar;
