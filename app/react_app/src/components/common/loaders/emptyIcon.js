import React from "react";
import PropTypes from "prop-types";
import icon_empty from "../../../public/img/icons/icon_empty.png";

const emptyIcon = props => {
  const { className, message } = props;
  return (
    <div className={`${className} text-center w-100 minw-100`}>
      <img src={icon_empty} alt="Icono Vacio" />
      <h4>{message}</h4>
    </div>
  );
};

emptyIcon.propTypes = {
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

emptyIcon.defaultProps = {
  className: "",
  message: "No hay informacion para mostrar"
};

export default emptyIcon;
