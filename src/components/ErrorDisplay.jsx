import React from "react";

const ErrorDisplay = (props) => {
  const error = props.errorMessage
    ? `${props.errorMessage}`
    : `${"The requested resource or path was not found"}`;

  return <h3>Your request returned an error with the message: "{error}".</h3>;
};

export default ErrorDisplay;
