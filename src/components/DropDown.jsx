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
      <select onChange={handleSelectedLanguage} className="dropDownContainer">
        <option default value="" className="dropDownContainer">
          Choose language...
        </option>
        <option default value="German" className="dropDownContainer">
          German
        </option>
        <option value="French" className="dropDownContainer">
          French
        </option>
        <option value="Spanish" className="dropDownContainer">
          Spanish
        </option>
      </select>
    </>
  );
};

export default DropDown;
