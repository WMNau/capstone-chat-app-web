import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXkYst7kmaaAzoKQO5Qi3YRzzn3tnDTxw",
  authDomain: "capstone-chat-sp2019.firebaseapp.com",
  databaseURL: "https://capstone-chat-sp2019.firebaseio.com",
  projectId: "capstone-chat-sp2019",
  storageBucket: "capstone-chat-sp2019.appspot.com",
  messagingSenderId: "305702236807",
  appId: "1:305702236807:web:8601d6c3c5325288",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
