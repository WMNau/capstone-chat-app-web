import {
  IMAGE_STORED,
  ERROR_IMAGE_STORED,
  UPDATE_USER,
  ERROR_UPDATE_USER,
} from "../actions/types";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_STORED:
      return initialState;
    case UPDATE_USER:
      return { ...state };
    case ERROR_IMAGE_STORED:
      return {
        ...state,
        userError: action.payload,
      };
    case ERROR_UPDATE_USER:
      return {
        ...state,
        userError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
