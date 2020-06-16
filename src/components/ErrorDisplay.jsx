import React from "react";

const ErrorDisplay = (props) => {
  const error = props.errorMessage
    ? `${props.errorMessage}`
    : `${"The requested resource or path was not found."}`;

  return (
    <div className="errorDisplay">
      <p>{error}</p>
    </div>
  );
};

export default ErrorDisplay;
