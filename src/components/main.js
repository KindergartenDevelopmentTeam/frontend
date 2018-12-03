import React from 'react';

import Notifications from './Notifications';
import ChildrensPage from './ChildrensPage';
import Default from './Default';
import Group from './Group';
import Messages from './Messages';
import { Route, Switch } from 'react-router-dom';
import Post from "./PostPage";
import AdminPage from "./AdminPage";


const Main =() => (
    <Switch>
        <Route exact path="/home" component={Default}/>
        <Route path="/notifications" component={Notifications}/>
        <Route path="/group" component={Group}/>
        <Route path="/childrenspage" component={ChildrensPage}/>
        <Route path="/messages" component={Messages}/>
        <Route path="/post" component={Post}/>
        <Route path="/adminpage"  component={AdminPage}/>
        <Route path="/"  component={Default}/>
    </Switch>
);
    export default Main;
