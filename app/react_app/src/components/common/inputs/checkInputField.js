import React from "react";
import PropTypes from "prop-types";

const CheckInputField = props => {
  const {
    label,
    input_size,
    checked,
    id,
    onchange,
    disabled,
    readOnly
  } = props;
  return (
    <div className={`col ${input_size}`}>
      <label>
        <input
          type="checkbox"
          className="filled-in"
          checked={checked ? "checked" : ""}
          id={id}
          name={id}
          onChange={onchange}
          disabled={disabled ? "disabled" : ""}
          readOnly={readOnly}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

CheckInputField.propTypes = {
  label: PropTypes.string.isRequired,
  input_size: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onchange: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool
};

CheckInputField.defaultProps = {
  input_size: "s12",
  checked: false,
  disabled: false
};

export default CheckInputField;
