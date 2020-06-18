import React from "react";
import { Link } from "@reach/router";
import "../StyleSheets/LoginAlert.css";

const LoginAlert = () => {
  let linkToLogin = <Link to="/login">login</Link>;
  return (
    <section className="loginAlertContainer">
      <h4 className="loginAlertMessage">Please {linkToLogin}</h4>
    </section>
  );
};

export default LoginAlert;
