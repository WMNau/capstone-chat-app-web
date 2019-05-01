import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

/* TODO: Get development config from .env */
/* TODO: Delete before pushing to git */

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.app = app;
    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  signUp = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  login = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  logout = () => this.auth.signOut();

  updateEmail = email => this.auth.currentUser.updateEmail(email);

  resetPassword = email => {
    return this.auth.sendPasswordResetEmail(email);
  };

  uid = () => this.auth.currentUser.uid;

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  updateUser = (uid, updatedUser) => this.user(uid).update(updatedUser);

  deleteUser = () => this.auth.currentUser.delete();

  storageRef = fileName => this.storage.ref(`images/profiles/${fileName}`);
}

export default Firebase;
