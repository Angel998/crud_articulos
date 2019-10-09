import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center"
};
const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const formatGroupLabel = categorie => (
  <div style={groupStyles}>
    <span>{categorie.label}</span>
    <span style={groupBadgeStyles}>{categorie.options.length}</span>
  </div>
);

const selectCategorie = props => {
  const { id, error, helper_text, options, value, onChange } = props;
  console.log(value);
  return (
    <div className="input-field col s12 m6">
      <Select
        id={id}
        name={id}
        value={value}
        options={options}
        formatGroupLabel={formatGroupLabel}
        onChange={onChange}
      />
      {error && <span className="helper-text text-danger">{error}</span>}
      {helper_text && !error && (
        <span className="helper-text">{helper_text}</span>
      )}
    </div>
  );
};
selectCategorie.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  helper_text: PropTypes.string,
  error: PropTypes.string
};

selectCategorie.defaultProps = {
  value: "0",
  options: [],
  helper_text: null,
  error: null,
  active_label: false
};

export default selectCategorie;
