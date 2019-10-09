import React from "react";
import PropTypes from "prop-types";

const Spinner = props => {
  const { fullWidth, extraClass, message } = props;

  const content = (
    <div className="spinner-layer spinner-blue-only">
      <div className="circle-clipper left">
        <div className="circle" />
      </div>
      <div className="gap-patch">
        <div className="circle" />
      </div>
      <div className="circle-clipper right">
        <div className="circle" />
      </div>
    </div>
  );

  if (fullWidth) {
    return (
      <div className={`minw-100 center ${extraClass}`}>
        <div className="preloader-wrapper active">{content}</div>
        {message && <h5>{message}</h5>}
      </div>
    );
  }

  return <div className="preloader-wrapper active">{content}</div>;
};

Spinner.propTypes = {
  message: PropTypes.string,
  fullWidth: PropTypes.bool.isRequired,
  extraClass: PropTypes.string
};

Spinner.defaultProps = {
  message: null,
  fullWidth: true,
  extraClass: ""
};

export default Spinner;
