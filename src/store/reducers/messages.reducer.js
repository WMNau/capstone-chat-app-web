import { MESSAGE_SENT, ERROR_MESSAGE_SENT } from "../actions/types";

const initialState = {
  messageError: null,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_SENT:
      return {
        ...state,
        messageError: null,
      };
    case ERROR_MESSAGE_SENT:
      return {
        ...state,
        messageError: action.payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
