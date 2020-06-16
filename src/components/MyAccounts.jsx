import React from "react";

const MyAccounts = (props) => {
  const { name, email, token } = props;
  if (!token) return <h4>Please log in</h4>;
  return (
    <div className="pageContainer">
      <div className="titleBackground">
        <div className="titleContainer">
          <h3 className="titleHeader">Account</h3>
        </div>
      </div>
      <div className="contentBackground">
        <div className="contentContainer">
          <p className="accountName">{name}</p>
          <p className="accountEmail">{email}</p>
          <p className="placeholderChart">Chart goes here</p>
        </div>
      </div>
    </div>
  );
};

export default MyAccounts;
