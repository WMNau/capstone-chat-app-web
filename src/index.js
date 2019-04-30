import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";

import * as serviceWorker from "./serviceWorker";

import "jquery";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

import "./constants/fontawesome";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
