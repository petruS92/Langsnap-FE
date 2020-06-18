import React from "react";
import { Link } from "@reach/router";

const SignUpThankYou = () => {
  let linkToLogin = <Link to="/login">log in</Link>;
  return (
    <p>
      Thank you for signing up! To review your progress, please {linkToLogin}{" "}
      and check your profile.
    </p>
  );
};

export default SignUpThankYou;

// IS THIS COMPONENT BEING USED ANYMORE.................................................
