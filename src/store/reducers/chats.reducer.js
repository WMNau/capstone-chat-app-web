import { ADD_CHAT, ERROR_ADD_CHAT } from "../actions/types";

const initialState = {
  messageError: null,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT:
      return {
        ...state,
        messageError: null,
      };
    case ERROR_ADD_CHAT:
      return {
        ...state,
        messageError: action.payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
