import {
  CREATE_USER,
  ERROR_CREATE_USER,
  UPDATE_USER,
  ERROR_UPDATE_USER,
} from "./types";

export const createUser = (uid, profile) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .database()
      .ref(`users/${uid}`)
      .set({
        ...profile,
        uid,
      })
      .then(() => dispatch({ type: CREATE_USER, payload: profile }))
      .catch(err => {
        firebase
          .storage()
          .ref(`images/profiles/${uid}_${profile.timestamp}`)
          .delete()
          .then(() => firebase.auth().currentUser.delete())
          .then(() => dispatch({ type: ERROR_CREATE_USER, payload: err }))
          .catch(error =>
            dispatch({ type: ERROR_CREATE_USER, payload: error })
          );
      });
  };
};

export const storeProfileImage = (uid, profile) => {
  return (dispatch, getState, { getFirebase }) => {
    if (profile.profileImage === "") dispatch(createUser(uid, profile));
    else {
      const newProfile = { ...profile };
      const firebase = getFirebase();
      const uploadTask = firebase
        .storage()
        .ref(`images/profiles/${uid}_${profile.timestamp}`)
        .put(profile.profileImage);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(url => {
            newProfile.profileImage = url;
            return dispatch(createUser(uid, newProfile));
          })
          .catch(err => {
            if (err.code === "storage/object-not-found")
              return dispatch(createUser(uid, newProfile, uploadTask));
            return firebase
              .auth()
              .currentUser.delete()
              .then(() => dispatch({ type: ERROR_CREATE_USER, payload: err }))
              .catch(error =>
                dispatch({ type: ERROR_CREATE_USER, payload: err })
              );
          });
      });
    }
  };
};

export const updateProfile = (user, profile) => {
  return (dispatch, getState, { getFirebase }) => {
    const passedProfile = { ...profile };
    if (
      profile.profileImage === "" ||
      user.profileImage === profile.profileImage
    ) {
      passedProfile.profileImage = user.profileImage;
      return dispatch(update(user, passedProfile));
    } else {
      const firebase = getFirebase();
      const uploadTask = firebase
        .storage()
        .ref(`images/profiles/${user.uid}_${profile.timestamp}`)
        .put(profile.profileImage);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(url => {
            passedProfile.profileImage = url;
            return dispatch(update(user, passedProfile));
          })
          .catch(err => {
            if (err.code === "storage/object-not-found")
              return dispatch(update(user, updateProfile));
            return dispatch({ type: ERROR_UPDATE_USER, payload: err });
          });
      });
    }
  };
};

export const update = (user, profile) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const updatedProfile = { ...profile };
    updatedProfile.fullName = `${
      user.firstName === profile.firstName ? user.firstName : profile.firstName
    } ${user.lastName === profile.lastName ? user.lastName : profile.lastName}`;
    updatedProfile.updatedAt = Date.now();
    firebase
      .database()
      .ref(`users/${user.uid}`)
      .update(updatedProfile)
      .then(() => dispatch({ type: UPDATE_USER }))
      .catch(err => dispatch({ type: ERROR_UPDATE_USER, payload: err }));
  };
};
