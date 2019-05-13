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
} from "./types";

import { storeProfileImage, updateUserEmail } from "./user.action";

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

export const requestPasswordResetEmailProfile = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    firebase
      .auth()
      .sendPasswordResetEmail(user.email)
      .then(() => dispatch({ type: REQUEST_PASSWORD }))
      .catch(err => dispatch({ type: ERROR_REQUEST_PASSWORD, payload: err }));
  };
};

export const updateEmail = (email, password) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    user
      .reauthenticateAndRetrieveDataWithCredential(credentials)
      .then(() => dispatch(updateEmailAfterReauthentication(user, email)))
      .then(() => dispatch(updateUserEmail(user, email)))
      .then(() => dispatch({ type: REAUTHENTICATE }))
      .catch(err => dispatch({ type: ERROR_REAUTHENTICATE, payload: err }));
  };
};

export const updateEmailAfterReauthentication = (user, email) => {
  return (dispatch, getState, { getFirebase }) => {
    user
      .updateEmail(email)
      .then(() => dispatch({ type: UPDATE_EMAIL }))
      .catch(err => dispatch({ type: ERROR_UPDATE_EMAIL, payload: err }));
  };
};
