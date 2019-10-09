import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  initMaterialComponents,
  removeMaterialComponents
} from "../../../utils/materialFunctions";
import { updateArticle, getArticle } from "../../../actions/articleActions";
import { isEmpty } from "../../../utils/validations";

import Navbar from "../../common/layout/Navbar";
import Card from "../../common/cards/card";
import Spinner from "../../common/loaders/spinner";
import InputField from "../../common/inputs/inputField";

class Articles extends Component {
  state = {
    nombre: "",
    codigo_barra: "",
    precio: "0",
    cantidad: "0",
    marca: "",
    errors: {}
  };
  componentDidMount() {
    initMaterialComponents();
    this.props.getArticle(this.props.match.params.id);
  }

  componentWillUnmount() {
    removeMaterialComponents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.errors) {
      this.setState({ errors: nextProps.error.errors });
    }

    if (!nextProps.article.loading && !isEmpty(nextProps.article.article)) {
      const {
        nombre,
        codigo_barra,
        precio,
        cantidad,
        marca
      } = nextProps.article.article;
      this.setState({
        nombre,
        codigo_barra,
        precio,
        cantidad,
        marca: marca ? marca : ""
      });
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onSaveClick = () => {
    if (this.props.article.loading) return;

    const { nombre, codigo_barra, precio, cantidad, marca } = this.state;
    this.props.updateArticle(
      this.props.match.params.id,
      { nombre, codigo_barra, precio, cantidad, marca },
      this.props.history
    );
  };

  getInputCard = () => {
    const {
      nombre,
      codigo_barra,
      precio,
      cantidad,
      marca,
      errors: { nombre_error, codigo_barra_error, precio_error, cantidad_error }
    } = this.state;

    return (
      <Card>
        <div className="row">
          <InputField
            id="nombre"
            label="Nombre"
            input_size="s12 m6"
            active_label={true}
            value={nombre}
            error={nombre_error}
            onChange={this.onChangeTextInput}
          />

          <InputField
            id="codigo_barra"
            input_size="s12 m6"
            label="Codigo de barra"
            active_label={true}
            value={codigo_barra}
            error={codigo_barra_error}
            onChange={this.onChangeTextInput}
          />
        </div>

        <div className="row">
          <InputField
            id="precio"
            label="Precio"
            input_size="s12 m6"
            active_label={true}
            value={precio}
            error={precio_error}
            onChange={this.onChangeTextInput}
          />

          <InputField
            id="cantidad"
            input_size="s12 m6"
            label="Cantidad"
            active_label={true}
            value={cantidad}
            error={cantidad_error}
            onChange={this.onChangeTextInput}
          />
        </div>

        <div className="row">
          <InputField
            input_size="s12 m6"
            id="marca"
            label="Marca"
            active_label={true}
            value={marca}
            onChange={this.onChangeTextInput}
          />
        </div>
        {this.props.article.loading && <Spinner />}
        <div className="row">
          <div className="col s12">
            <button className="btn right" onClick={this.onSaveClick}>
              Guardar
            </button>
          </div>
        </div>
      </Card>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main>
          <div className="container white">{this.getInputCard()}</div>
        </main>
      </React.Fragment>
    );
  }
}

Articles.propTypes = {
  article: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  updateArticle: PropTypes.func.isRequired,
  getArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  article: state.article,
  error: state.error
});

export default connect(
  mapStateToProps,
  { updateArticle, getArticle }
)(Articles);
