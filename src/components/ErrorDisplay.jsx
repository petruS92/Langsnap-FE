import React from "react";

const ErrorDisplay = ({ errorMessage }) => {
  const error = errorMessage
    ? `${errorMessage}`
    : `${"The requested resource or path was not found."}`;

  return (
    <section className="errorDisplay">
      <p>{error}</p>
    </section>
  );
};

export default ErrorDisplay;
