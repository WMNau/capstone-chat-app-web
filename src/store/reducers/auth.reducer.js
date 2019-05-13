import {
  CREATE_USER,
  ERROR_CREATE_USER,
  LOGIN,
  ERROR_LOGIN,
  LOGOUT,
  ERROR_LOGOUT,
  REQUEST_PASSWORD,
  ERROR_REQUEST_PASSWORD,
  UPDATE_EMAIL,
  ERROR_UPDATE_EMAIL,
  REAUTHENTICATE,
  ERROR_REAUTHENTICATE,
} from "../actions/types";

const initialState = {
  authError: null,
  updateEmailSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        authError: null,
        updateEmailSuccess: false,
      };
    case LOGIN:
      return initialState;
    case LOGOUT:
      return initialState;
    case REQUEST_PASSWORD:
      return {
        ...state,
        authError: null,
        updateEmailSuccess: false,
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        authError: null,
        updateEmailSuccess: true,
      };
    case REAUTHENTICATE:
      return {
        ...state,
        authError: null,
        updateEmailSuccess: false,
      };
    case ERROR_CREATE_USER:
      console.log("Create User Error:", action.payload);
      return {
        ...state,
        authError: action.payload,
        updateEmailSuccess: false,
      };
    case ERROR_LOGIN:
      console.log("Login Error:", action.payload);
      return {
        ...state,
        authError: action.payload,
        updateEmailSuccess: false,
      };
    case ERROR_LOGOUT:
      console.log("Logout Error:", action.payload);
      return {
        ...state,
        authError: action.payload,
        updateEmailSuccess: false,
      };
    case ERROR_REQUEST_PASSWORD:
      console.log("Request Password Error:", action.payload);
      return {
        ...state,
        authError: action.payload,
        updateEmailSuccess: false,
      };
    case ERROR_UPDATE_EMAIL:
      console.log("Update Email Error:", action.payload);
      return {
        ...state,
        authError: action.payload,
        updateEmailSuccess: false,
      };
    case ERROR_REAUTHENTICATE:
      console.log("Reauthentication Error:", action.payload);
      return {
        ...state,
        authError: action.payload,
        updateEmailSuccess: false,
      };
    default:
      return state;
  }
};

export default authReducer;
