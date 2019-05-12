import {
  CREATE_USER,
  ERROR_CREATE_USER,
  LOGIN,
  ERROR_LOGIN,
  LOGOUT,
  ERROR_LOGOUT,
  REQUEST_PASSWORD,
  ERROR_REQUEST_PASSWORD,
} from "../actions/types";

const initialState = {
  authError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        authError: null,
      };
    case LOGIN:
      return initialState;
    case LOGOUT:
      return initialState;
    case REQUEST_PASSWORD:
      return {
        ...state,
        authError: null,
      };
    case ERROR_CREATE_USER:
      console.log("Create User Error:", action.payload);
      return {
        ...state,
        authError: action.payload,
      };
    case ERROR_LOGIN:
      console.log("Login Error:", action.payload);
      return {
        ...state,
        authError: action.payload,
      };
    case ERROR_LOGOUT:
      console.log("Logout Error:", action.payload);
      return {
        ...state,
        authError: action.payload,
      };
    case ERROR_REQUEST_PASSWORD:
      return {
        ...state,
        authError: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
