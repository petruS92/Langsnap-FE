import React from "react";
import { Link } from "@reach/router";
import Logout from "./Logout";

const NavBar = (props) => {
  const { isLoggedIn, loggingOut } = props;
  return (
    <section className="navContainer">
      <nav className="nav" role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>

          <ul id="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{!isLoggedIn && <Link to="/login">Login</Link>}</li>
            <li>{!isLoggedIn && <Link to="/signup">Sign up</Link>}</li>
            <li>{isLoggedIn && <Link to="/myaccount">My Account</Link>}</li>
            <li>{isLoggedIn && <Link to="/game">Test yourself!</Link>}</li>
            <li>{isLoggedIn && <Link to="/wordslist">My Words</Link>}</li>
            <li>
              {isLoggedIn && (
                <Logout isLoggedIn={isLoggedIn} loggingOut={loggingOut} />
              )}
            </li>
          </ul>
        </div>
      </nav>
      <h3 className="appTitle">langsnap</h3>
    </section>
  );
};

export default NavBar;
