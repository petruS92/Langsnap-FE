import React from "react";

const ErrorDisplayPage = ({ errorMessage }) => {
  const error = errorMessage
    ? `${errorMessage}`
    : `${"The requested resource or path was not found."}`;

  return (
    <section className="alertBackground">
      <div className="alertContainer">
        <section className="errorPageContainer">
          <h1 className="errorPageMessage">{error}</h1>
        </section>
      </div>
    </section>
  );
};

export default ErrorDisplayPage;
