import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { withAuthentication } from "../Session";

import * as ROUTES from "../../constants/routes";

import Navigation from "../Navigation";
import Login from "../Login";
import Register from "../Register";
import Chat from "../Chat";
import Profiles from "../Profiles";
import Profile from "../Profile";
import EditProfile from "../Profile/Edit.profile";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path={`${ROUTES.EDIT}:id`} component={EditProfile} />
        <Route path={`${ROUTES.PROFILE}:id`} component={Profile} />
        <Route exact path={ROUTES.PROFILES} component={Profiles} />
        <Route exact path={ROUTES.CHAT} component={Chat} />
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.REGISTER} component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default withAuthentication(App);
