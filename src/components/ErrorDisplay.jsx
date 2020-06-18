import React from "react";

const ErrorDisplay = ({ errorMessage }) => {
  const error = errorMessage
    ? `${errorMessage}`
    : `${"The requested resource or path was not found."}`;

  return (
    <div className="errorAlertContainer">
      <p className="errorAlertMessage">{error}</p>
    </div>
  );
};

export default ErrorDisplay;
