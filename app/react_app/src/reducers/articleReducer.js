import {
  ARTICLE_LOADING,
  ARTICLE_END_LOADING,
  GET_ARTICLES,
  GET_ARTICLE,
  ARTICLE_RESET_DATA
} from "../actions/types";

const initialState = {
  loading: false,
  articles: [],
  article: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ARTICLE_LOADING:
      return {
        ...state,
        loading: true
      };

    case ARTICLE_END_LOADING:
      return {
        ...state,
        loading: false
      };

    case GET_ARTICLES:
      return {
        ...state,
        loading: false,
        articles: action.payload
      };

    case GET_ARTICLE:
      return {
        ...state,
        loading: false,
        article: action.payload
      };

    case ARTICLE_RESET_DATA:
      return {
        ...state,
        loading: false,
        article: {},
        articles: []
      };

    default:
      return state;
  }
}
