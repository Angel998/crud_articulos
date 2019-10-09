import { GET_ERRORS, CLEAR_ERRORS } from "./types";
import { configUserTokenFromResponse } from "./authActions";
import { isEmpty } from "../utils/validations";

export const clearErrors = dispatch => {
  dispatch(clearErrorsObject);
};

export const getErrors = (dispatch, errors) => {
  dispatch({
    type: GET_ERRORS,
    payload: errors
  });
};

export const getErrorsFromResponse = (
  dispatch,
  errorResponse,
  ANOTHER_DISPATCH_EVENT = null
) => {
  if (ANOTHER_DISPATCH_EVENT) {
    dispatch({
      type: ANOTHER_DISPATCH_EVENT
    });
  }
  if (errorResponse && errorResponse.response) {
    let force_delete_token = false;
    if (errorResponse.response.data && errorResponse.response.data.data) {
      dispatch({
        type: GET_ERRORS,
        payload: errorResponse.response.data.data
      });
      force_delete_token =
        !isEmpty(errorResponse.response.data.data.error) &&
        errorResponse.response.data.data.error === "INVALID_SESSION";
    }
    configUserTokenFromResponse(
      errorResponse.response.data.data,
      dispatch,
      force_delete_token
    );
  }
};

const clearErrorsObject = {
  type: CLEAR_ERRORS
};
