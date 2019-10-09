import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  initMaterialComponents,
  removeMaterialComponents
} from "../../../utils/materialFunctions";

import { getArticles } from "../../../actions/articleActions";

import Navbar from "../../common/layout/Navbar";
import MapArticles from "../../common/mappers/mapArticles";
import SearchModal from "../../common/modals/SearchArticles";

class Articles extends Component {
  componentDidMount() {
    initMaterialComponents();
    this.props.getArticles();
  }

  componentWillUnmount() {
    removeMaterialComponents();
  }

  render() {
    const { articles, loading } = this.props.article;
    return (
      <React.Fragment>
        <Navbar />
        <main>
          <div className="container">
            <MapArticles articles={articles} loading={loading} />

            <div className="fixed-action-btn">
              <button
                className="btn-floating btn-large right modal-trigger"
                style={{ zIndex: "1000" }}
                data-target="modal_buscar_articulos"
              >
                <i className="material-icons">search</i>
              </button>
            </div>
          </div>
        </main>

        <SearchModal />
      </React.Fragment>
    );
  }
}

Articles.propTypes = {
  article: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default connect(
  mapStateToProps,
  { getArticles }
)(Articles);
