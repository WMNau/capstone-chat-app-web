import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import auth from "./auth.reducer";
import user from "./user.reducer";
import messages from "./messages.reducer";
import rooms from "./rooms.reducer";
import chats from "./chats.reducer";

const reducers = combineReducers({
  auth,
  user,
  messages,
  rooms,
  chats,
  firebase: firebaseReducer,
});

const rootReducer = reducers;

export default rootReducer;
