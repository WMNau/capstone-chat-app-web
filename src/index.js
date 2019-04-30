import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import "jquery";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

import "./constants/fontawesome";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
