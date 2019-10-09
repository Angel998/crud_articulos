import axios from "axios";
import {
  ARTICLE_LOADING,
  ARTICLE_END_LOADING,
  GET_ARTICLES,
  GET_ARTICLE
} from "./types";
import { configUserTokenFromResponse } from "./authActions";
import { getErrorsFromResponse, clearErrors } from "./errorActions";
import { API_URL } from "../config/serverConfig";

export const getArticles = () => async dispatch => {
  setArticleLoading(dispatch);
  try {
    const serverResponse = await axios.get(`${API_URL}/articles`);
    const serverData = serverResponse.data;
    clearErrors(dispatch);
    configUserTokenFromResponse(serverData, dispatch);
    dispatch({
      type: GET_ARTICLES,
      payload: serverData.data
    });
  } catch (err) {
    getErrorsFromResponse(dispatch, err, ARTICLE_END_LOADING);
  }
};

export const searchArticles = searchField => async dispatch => {
  setArticleLoading(dispatch);
  try {
    const serverResponse = await axios.get(
      `${API_URL}/articles/search/${searchField}`
    );
    const serverData = serverResponse.data;
    clearErrors(dispatch);
    configUserTokenFromResponse(serverData, dispatch);
    dispatch({
      type: GET_ARTICLES,
      payload: serverData.data
    });
  } catch (err) {
    getErrorsFromResponse(dispatch, err, ARTICLE_END_LOADING);
  }
};

export const getArticle = id => async dispatch => {
  setArticleLoading(dispatch);
  try {
    const serverResponse = await axios.get(`${API_URL}/articles/get_one/${id}`);
    const serverData = serverResponse.data;
    clearErrors(dispatch);
    configUserTokenFromResponse(serverData, dispatch);
    dispatch({
      type: GET_ARTICLE,
      payload: serverData.data
    });
  } catch (err) {
    getErrorsFromResponse(dispatch, err, ARTICLE_END_LOADING);
  }
};

export const addArticle = (articleData, history) => async dispatch => {
  setArticleLoading(dispatch);
  try {
    const serverResponse = await axios.post(
      `${API_URL}/articles/add`,
      articleData
    );
    const serverData = serverResponse.data;
    clearErrors(dispatch);
    configUserTokenFromResponse(serverData, dispatch);
    dispatch({
      type: ARTICLE_END_LOADING
    });
    history.push(`/articulos/${serverData.data.id}`);
  } catch (err) {
    getErrorsFromResponse(dispatch, err, ARTICLE_END_LOADING);
  }
};

export const updateArticle = (id, articleData, history) => async dispatch => {
  setArticleLoading(dispatch);
  try {
    const serverResponse = await axios.put(
      `${API_URL}/articles/update/${id}`,
      articleData
    );
    const serverData = serverResponse.data;
    clearErrors(dispatch);
    configUserTokenFromResponse(serverData, dispatch);
    dispatch({
      type: ARTICLE_END_LOADING
    });
    history.push(`/articulos/${serverData.data.id}`);
  } catch (err) {
    getErrorsFromResponse(dispatch, err, ARTICLE_END_LOADING);
  }
};

export const deleteArticle = (id, history) => async dispatch => {
  setArticleLoading(dispatch);
  try {
    const serverResponse = await axios.delete(
      `${API_URL}/articles/delete/${id}`
    );
    const serverData = serverResponse.data;
    clearErrors(dispatch);
    configUserTokenFromResponse(serverData, dispatch);
    dispatch({
      type: ARTICLE_END_LOADING
    });
    history.push(`/articulos`);
  } catch (err) {
    getErrorsFromResponse(dispatch, err, ARTICLE_END_LOADING);
  }
};

// Utils
export const setArticleLoading = dispatch => {
  dispatch({
    type: ARTICLE_LOADING
  });
};
