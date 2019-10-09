import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  initMaterialComponents,
  removeMaterialComponents
} from "../../../utils/materialFunctions";
import { getArticle, deleteArticle } from "../../../actions/articleActions";

import Navbar from "../../common/layout/Navbar";
import ArticleCard from "../../common/showdata/ArticleCard";

class Article extends Component {
  componentDidMount() {
    initMaterialComponents();
    this.props.getArticle(this.props.match.params.id);
  }

  componentWillUnmount() {
    removeMaterialComponents();
  }

  onDeleteClick = () => {
    this.props.deleteArticle(this.props.match.params.id, this.props.history);
  };

  render() {
    const { loading, article } = this.props.article;
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <ArticleCard
            loading={loading}
            article={article}
            onDeleteClick={this.onDeleteClick}
          />
        </div>
      </React.Fragment>
    );
  }
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default connect(
  mapStateToProps,
  { getArticle, deleteArticle }
)(Article);
