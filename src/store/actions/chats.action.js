import { ADD_CHAT, ERROR_ADD_CHAT } from "./types";

export const addChat = (room, text) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .database()
      .ref(`chats/${room.toLowerCase()}`)
      .push()
      .set({
        fromUid: firebase.auth().currentUser.uid,
        text,
        timestamp: Date.now(),
      })
      .then(() => dispatch({ type: ADD_CHAT }))
      .catch(err => dispatch({ type: ERROR_ADD_CHAT, payload: err }));
  };
};
