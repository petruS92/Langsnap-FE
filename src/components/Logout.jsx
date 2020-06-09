import React from "react";

const Logout = (props) => {
  const handleLogout = (event) => {
    props.loggingOut();
  };
  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
