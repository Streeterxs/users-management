import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { Login, UserEdit, UserCreation, UserList } from './Pages';

const Routes = () => (
    <Switch>
        <Route path="/" exact component={UserList}/>
        <Route path="/login" component={Login}/>
        <Route path="/create" component={UserCreation}/>
        <Route path="/edit/:identifier" component={UserEdit}/>
    </Switch>
);

export default Routes;