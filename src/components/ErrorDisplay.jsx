import React from "react";

const ErrorDisplay = (props) => {
  const error = props.errorMessage
    ? `${props.errorMessage}`
    : `${"The requested resource or path was not found."}`;

  return <span>{error}</span>;
};

export default ErrorDisplay;
