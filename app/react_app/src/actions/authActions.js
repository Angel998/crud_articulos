import axios from "axios";
import {
  AUTH_LOADING,
  AUTH_END_LOADING,
  AUTH_SET_DATA,
  AUTH_RESET_DATA
} from "./types";
import { getErrorsFromResponse, clearErrors } from "./errorActions";
import { getAndConfigTokenFromResponse } from "../utils/appFunctions";
import { API_URL } from "../config/serverConfig";
import { isEmpty } from "../utils/validations";

export const loginUser = (userData, history) => async dispatch => {
  setAuthLoading(dispatch);
  try {
    const serverResponse = await axios.post(`${API_URL}/users/login`, userData);
    const serverData = serverResponse.data;
    clearErrors(dispatch);
    configUserTokenFromResponse(serverData, dispatch);
    history.push("/articulos");
  } catch (err) {
    getErrorsFromResponse(dispatch, err, AUTH_END_LOADING);
  }
};

export const logoutUser = () => dispatch => {
  configUserTokenFromResponse(null, dispatch, true);
  resetAuth(dispatch);
};

// Utils
export const configUserTokenFromResponse = (
  response,
  dispatch,
  delete_token_if_not_exists = false
) => {
  let decoded = getAndConfigTokenFromResponse(
    response,
    delete_token_if_not_exists
  );
  if (isEmpty(decoded)) {
    return;
  }
  dispatch(setCurrentUser(decoded));
};

export const setCurrentUser = user => {
  return {
    type: AUTH_SET_DATA,
    payload: user
  };
};

const setAuthLoading = dispatch => {
  dispatch({
    type: AUTH_LOADING
  });
};

const resetAuth = dispatch => {
  dispatch({
    type: AUTH_RESET_DATA
  });
};
