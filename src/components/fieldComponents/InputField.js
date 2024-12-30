import React from "react";

const InputField = ({
  label,
  value,
  placeholder,
  endIcon = null,
  startIcon = null,
  readOnly = null,
}) => {
  return (
    <>
      <label className="text-field-label">{label}</label>
      <div className="text-field-sec">
      {startIcon && <img src={startIcon} className="input-field-starticon" />}
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          className="input-field"
        />
        {endIcon && <img src={endIcon} className="input-field-endicon" />}
      </div>
    </>
  );
};

export default InputField;
