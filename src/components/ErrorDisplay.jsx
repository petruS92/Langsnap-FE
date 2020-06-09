import React from "react";

const ErrorDisplay = (props) => {
  if (props) {
    return (
      <h3>
        Your request returned an error with the message: '{props.message}'.
      </h3>
    );
  } else {
    return <h3>Something went wrong whilst processing your request.</h3>;
  }
};

export default ErrorDisplay;
