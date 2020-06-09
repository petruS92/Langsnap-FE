import React from "react";

const DropDown = (props) => {
  const handleSelectedLanguage = (event) => {
    const { value } = event.target;
    props.changeLanguage(value);
  };

  return (
    <>
      <p>Language: </p>
      <select onChange={handleSelectedLanguage}>
        <option default value="">
          Please select from below...
        </option>
        <option default value="de">
          German
        </option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
      </select>
    </>
  );
};

export default DropDown;
