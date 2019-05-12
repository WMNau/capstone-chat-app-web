import { MESSAGE_SENT, ERROR_MESSAGE_SENT } from "./types";

export const addMessage = (fromUid, toUid, text) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const timestamp = Date.now();
    firebase
      .database()
      .ref(`userMessages/${fromUid}/${toUid}`)
      .push()
      .set({
        fromUid,
        toUid,
        text,
        timestamp,
      })
      .then(() => dispatch(toMessage(fromUid, toUid, text, timestamp)))
      .then(() => dispatch(latestMessage(fromUid, toUid, text, timestamp)))
      .then(() => dispatch(toLatestMessage(fromUid, toUid, text, timestamp)))
      .then(() => dispatch({ type: MESSAGE_SENT }))
      .catch(err => dispatch({ type: ERROR_MESSAGE_SENT, payload: err }));
  };
};

const toMessage = (fromUid, toUid, text, timestamp) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .database()
      .ref(`userMessages/${toUid}/${fromUid}`)
      .push()
      .set({
        fromUid,
        toUid,
        text,
        timestamp,
      })
      .then(() => dispatch({ type: MESSAGE_SENT }))
      .catch(err => dispatch({ type: ERROR_MESSAGE_SENT, payload: err }));
  };
};

const latestMessage = (fromUid, toUid, text, timestamp) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .database()
      .ref(`latestMessages/${fromUid}/${toUid}`)
      .set({
        fromUid,
        toUid,
        text,
        timestamp,
      })
      .then(() => dispatch({ type: MESSAGE_SENT }))
      .catch(err => dispatch({ type: ERROR_MESSAGE_SENT, payload: err }));
  };
};

const toLatestMessage = (fromUid, toUid, text, timestamp) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .database()
      .ref(`latestMessages/${toUid}/${fromUid}`)
      .set({
        fromUid,
        toUid,
        text,
        timestamp,
      })
      .then(() => dispatch({ type: MESSAGE_SENT }))
      .catch(err => dispatch({ type: ERROR_MESSAGE_SENT, payload: err }));
  };
};
