import React from "react";

const MyAccounts = (props) => {
  const { name, email, token } = props;
  if (!token) return <h4>Please log in</h4>;
  return (
    <>
      <p>Name: {name}</p>
      <br />
      <p>Email: {email}</p>
      <br />
      <p>CHART GOES HERE</p>
    </>
  );
};

export default MyAccounts;
