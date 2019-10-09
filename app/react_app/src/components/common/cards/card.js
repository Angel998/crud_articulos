import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const card = props => {
  const {
    id,
    image,
    link,
    className,
    simple_content,
    hoverable,
    children
  } = props;

  let cardClasses = "card";

  if (hoverable) {
    cardClasses = `${cardClasses} hoverable`;
  }

  let cardStructure = (
    <div className={`${cardClasses} ${className}`} id={id}>
      {image && (
        <div className="card-image">
          <img src={image} alt="Imagen del card" />
        </div>
      )}
      {simple_content ? (
        <div className="card-content">{children}</div>
      ) : (
        children
      )}
    </div>
  );
  let cardContent;

  if (link) {
    cardContent = (
      <Link to={link} className="text-black">
        {cardStructure}
      </Link>
    );
  } else {
    cardContent = cardStructure;
  }
  return cardContent;
};

card.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
  simple_content: PropTypes.bool.isRequired,
  hoverable: PropTypes.bool.isRequired,
  className: PropTypes.string
};

card.defaultProps = {
  id: "",
  className: "",
  simple_content: true,
  hoverable: false
};

export default card;
