import React from "react";

const DropDown = ({ changeLanguage }) => {
  const handleSelectedLanguage = (event) => {
    const {
      target: { value },
    } = event;

    changeLanguage(value);
  };

  return (
    <>
      <label htmlFor="languageDropDown">
        <select
          onChange={handleSelectedLanguage}
          className="dropDownContainer"
          name="languageDropDown"
        >
          <option value="" className="dropDownContainer">
            Choose a language...
          </option>
          <option value="German" className="dropDownContainer">
            German
          </option>
          <option value="French" className="dropDownContainer">
            French
          </option>
          <option value="Spanish" className="dropDownContainer">
            Spanish
          </option>
        </select>
      </label>
      <span role="img" aria-label="select-arrow" className="dropDownArrow">
        ▼
      </span>
    </>
  );
};

export default DropDown;
