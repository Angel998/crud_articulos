import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { isEmpty } from "../../../utils/validations";
import Spinner from "../loaders/spinner";
import EmptyIcon from "../loaders/emptyIcon";
import Card from "../cards/card";

function ArticleCard({ loading, article, onDeleteClick }) {
  if (loading) return <Spinner />;

  if (isEmpty(article)) return <EmptyIcon />;

  const { id, nombre, codigo_barra, precio, cantidad, marca } = article;
  return (
    <div className="row">
      <div className="col s12">
        <Card>
          <table>
            <tbody>
              <tr>
                <td>Nombre</td>
                <td>{nombre}</td>
              </tr>
              <tr>
                <td>Codigo</td>
                <td>{codigo_barra}</td>
              </tr>
              <tr>
                <td>Precio</td>
                <td>Lps {precio}</td>
              </tr>
              <tr>
                <td>Cantidad</td>
                <td>{cantidad}</td>
              </tr>
              {marca && (
                <tr>
                  <td>Marca</td>
                  <td>{marca}</td>
                </tr>
              )}
            </tbody>
          </table>

          <div
            className="w-100"
            style={{
              marginTop: "10px",
              marginBottom: "40px"
            }}
          >
            <Link className="right btn" to={`/editar_articulo/${id}`}>
              Editar
            </Link>
          </div>
        </Card>

        <button className="btn red" onClick={onDeleteClick}>
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  article: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

ArticleCard.defaultProps = {
  loading: false
};

export default ArticleCard;
