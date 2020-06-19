import React from "react";
import { Link } from "@reach/router";

const LoginAlert = () => {
  let linkToLogin = (
    <Link to="/login" className="loginSignupMessage">
      login
    </Link>
  );
  return (
    <section className="alertBackground">
      <div className="alertContainer">
        <section className="loginAlertContainer">
          <h1 className="loginAlertMessage">Please {linkToLogin}</h1>
        </section>
      </div>
    </section>
  );
};

export default LoginAlert;
