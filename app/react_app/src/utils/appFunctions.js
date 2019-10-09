import axios from "axios";
import jwt_decode from "jwt-decode";
import { isEmpty } from "./validations";
import { setCurrentUser } from "../actions/authActions";
import { TOKEN_BEARER } from "../config/serverConfig";

export const getAndConfigTokenFromResponse = (
  response,
  delete_if_not_exists = false
) => {
  let decoded = null;
  if (response && response.token) {
    decoded = jwt_decode(response.token);
    axios.defaults.headers.common[
      "x-auth-token"
    ] = `${TOKEN_BEARER} ${response.token}`;
    localStorage.setItem("token", JSON.stringify({ token: response.token }));
  } else if (delete_if_not_exists) {
    delete axios.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
  return decoded;
};

export const checkAppStatus = store => {
  const json_app_token = localStorage.getItem("token");
  if (isEmpty(json_app_token)) return;
  const token = JSON.parse(json_app_token).token;
  const decoded = getAndConfigTokenFromResponse({ token });
  if (isEmpty(decoded)) return;

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    return getAndConfigTokenFromResponse(null, true);
  } else {
    store.dispatch(setCurrentUser(decoded));
  }
};
