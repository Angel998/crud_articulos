import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";

import Spinner from "../loaders/spinner";
import EmptyIcon from "../loaders/emptyIcon";
import ArticleCard from "../cards/articleCard";

function mapArticles({ articles, loading }) {
  if (loading) {
    return <Spinner />;
  }

  if (articles.length === 0) {
    return <EmptyIcon />;
  }

  return (
    <div className="row">
      <div className="col s12">
        {articles.map(article => (
          <ArticleCard article={article} key={uuid()} />
        ))}
      </div>
    </div>
  );
}

mapArticles.propTypes = {
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

mapArticles.defaultProps = {
  loading: false
};

export default mapArticles;
