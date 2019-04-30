import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { withAuthentication } from "../Session";

import * as ROUTES from "../../constants/routes";

import Navigation from "../Navigation";
import Login from "../Login";
import Register from "../Register";
import Chat from "../Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact path={ROUTES.CHAT} component={Chat} />
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.REGISTER} component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default withAuthentication(App);
