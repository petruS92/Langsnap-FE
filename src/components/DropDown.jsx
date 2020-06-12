import React from "react";

const DropDown = (props) => {
  const handleSelectedLanguage = (event) => {
    const {
      target: { value },
    } = event;
    props.changeLanguage(value);
  };

  return (
    <>
      <p>Language: </p>
      <select onChange={handleSelectedLanguage}>
        <option default value="">
          Please select from below...
        </option>
        <option default value="German">
          German
        </option>
        <option value="French">French</option>
        <option value="Spanish">Spanish</option>
      </select>
    </>
  );
};

export default DropDown;
