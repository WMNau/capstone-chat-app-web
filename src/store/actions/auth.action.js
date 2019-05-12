import {
  CREATE_USER,
  ERROR_CREATE_USER,
  LOGIN,
  ERROR_LOGIN,
  LOGOUT,
  ERROR_LOGOUT,
  REQUEST_PASSWORD,
  ERROR_REQUEST_PASSWORD,
} from "./types";

import { storeProfileImage } from "./user.action";

export const register = (credentials, profile) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(() =>
        dispatch(storeProfileImage(firebase.auth().currentUser.uid, profile))
      )
      .then(() => dispatch({ type: CREATE_USER }))
      .catch(err => dispatch({ type: ERROR_CREATE_USER, payload: err }));
  };
};

export const login = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(dispatch({ type: LOGIN }))
      .catch(err => dispatch({ type: ERROR_LOGIN, payload: err }));
  };
};

export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => dispatch({ type: LOGOUT }))
      .catch(err => dispatch({ type: ERROR_LOGOUT, payload: err }));
  };
};

export const requestPasswordResetEmail = email => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => dispatch({ type: REQUEST_PASSWORD }))
      .catch(err => dispatch({ type: ERROR_REQUEST_PASSWORD, payload: err }));
  };
};
