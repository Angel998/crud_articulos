import React from "react";
import PropTypes from "prop-types";

const InputField = props => {
  const {
    input_size,
    icon,
    type,
    id,
    label,
    active_label,
    onChange,
    value,
    error,
    required,
    disabled,
    placeholder,
    helper_text,
    onKeyUp
  } = props;
  return (
    <div className={`input-field col ${input_size}`}>
      {icon && <i className={`material-icons prefix`}>{icon}</i>}

      {active_label || placeholder ? (
        <input
          type={type}
          id={id}
          name={id}
          className="validate"
          onChange={onChange}
          value={value}
          required={required}
          disabled={disabled}
          placeholder={placeholder ? placeholder : ""}
          onKeyUp={onKeyUp}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          className="validate"
          onChange={onChange}
          value={value}
          required={required}
          disabled={disabled}
          onKeyUp={onKeyUp}
        />
      )}

      <label htmlFor={id} className={`${active_label && "active"}`}>
        {label}
      </label>

      {error && <span className="helper-text text-danger">{error}</span>}

      {helper_text && !error && (
        <span className="helper-text">{helper_text}</span>
      )}
    </div>
  );
};

InputField.propTypes = {
  input_size: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  helper_text: PropTypes.string,
  active_label: PropTypes.bool.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func
};

InputField.defaultProps = {
  input_size: "s12",
  type: "text",
  helper_text: null,
  icon: null,
  error: null,
  placeholder: null,
  required: false,
  disabled: false,
  active_label: false
};

export default InputField;
