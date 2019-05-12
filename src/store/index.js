import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";

import firebaseConfig from "../components/Database";
import reducers from "./reducers";

const middleware = applyMiddleware(thunk.withExtraArgument({ getFirebase }));
const enhancers = compose(
  middleware,
  reactReduxFirebase(firebaseConfig)
);

const store = createStore(reducers, enhancers);

export default store;
