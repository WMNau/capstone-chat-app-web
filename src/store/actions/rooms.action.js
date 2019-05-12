import { ADD_ROOM, ERROR_ADD_ROOM } from "./types";

export const addRoom = room => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .database()
      .ref(`rooms/${room.toLowerCase()}`)
      .set({ name: room })
      .then(() => dispatch({ type: ADD_ROOM }))
      .catch(err => dispatch({ type: ERROR_ADD_ROOM, payload: err }));
  };
};
