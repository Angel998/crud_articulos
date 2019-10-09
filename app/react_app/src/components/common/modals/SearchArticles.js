import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getModalInstanceById } from "../../../utils/materialFunctions";
import { searchArticles, getArticles } from "../../../actions/articleActions";

import InputField from "../inputs/inputField";

class SearchArticles extends Component {
  state = {
    field: ""
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onSearch = () => {
    this.props.searchArticles(this.state.field);
    this.closeModal();
  };

  onGetAll = () => {
    this.props.getArticles();
    this.closeModal();
  };

  closeModal = () => {
    getModalInstanceById(this.props.modal_id).close();
  };
  render() {
    const { field } = this.state;
    return (
      <div className="modal" id={this.props.modal_id}>
        <div className="modal-content">
          <div className="row">
            <InputField
              id="field"
              value={field}
              label="Nombre, codigo de barra o precio"
              onChange={this.onChangeTextInput}
            />
          </div>
        </div>

        <div className="modal-footer">
          <a href="#!" className="btn-flat modal-close left">
            Cerrar{" "}
          </a>

          <div className="right">
            <button
              className="btn"
              style={{
                marginRight: "10px"
              }}
              onClick={this.onGetAll}
            >
              Obtener todo
            </button>

            <div className="btn" onClick={this.onSearch}>
              Buscar
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchArticles.propTypes = {
  modal_id: PropTypes.string.isRequired,
  searchArticles: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired
};

SearchArticles.defaultProps = {
  modal_id: "modal_buscar_articulos"
};

export default connect(
  null,
  { searchArticles, getArticles }
)(SearchArticles);
