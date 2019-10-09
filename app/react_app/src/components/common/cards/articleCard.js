import React from "react";
import PropTypes from "prop-types";

import Card from "./card";

function articleCard({ article }) {
  const { id, nombre, codigo_barra, precio, cantidad, marca } = article;
  return (
    <Card link={`/articulos/${id}`} hoverable={true}>
      <h5>{nombre}</h5>
      <span className="d-block">Codigo de barra: {codigo_barra}</span>
      <span className="d-block">Precio: Lps {precio}</span>
      <span className="d-block">Cantidad: {cantidad}</span>
      {marca && <span className="d-block">Marca: {marca}</span>}
    </Card>
  );
}

articleCard.propTypes = {
  article: PropTypes.object.isRequired
};

export default articleCard;
