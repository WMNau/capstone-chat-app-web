import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "../Navigation";
import Login from "../Login";
import Register from "../Register";
import PrivateMessages from "../PrivateMessages";
import Messages from "../PrivateMessages/Messages";
import RoomMessages from "../RoomMessages";
import Profiles from "../Profiles";
import Profile from "../Profile";
import EditProfile from "../Profile/Edit.profile";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/latest_messages" component={PrivateMessages} />
        <Route exact path="/messages/:fromUid/:toUid" component={Messages} />

        <Route exact path="/user/edit/:uid" component={EditProfile} />
        <Route exact path="/user/:uid" component={Profile} />
        <Route exact path="/users" component={Profiles} />
        <Route exact path="/room/:id" component={RoomMessages} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
