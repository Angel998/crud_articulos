import {
  AUTH_LOADING,
  AUTH_END_LOADING,
  AUTH_SET_DATA,
  AUTH_RESET_DATA
} from "../actions/types";
import { isEmpty } from "../utils/validations";

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      };

    case AUTH_END_LOADING:
      return {
        ...state,
        loading: false
      };

    case AUTH_RESET_DATA:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: {}
      };

    case AUTH_SET_DATA:
      const is_empty_payload = isEmpty(action.payload);
      return {
        ...state,
        loading: false,
        isLoggedIn: !is_empty_payload,
        user: is_empty_payload ? {} : action.payload
      };

    default:
      return state;
  }
}
