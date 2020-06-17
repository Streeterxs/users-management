import React, { useEffect } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Login, UserEdit, UserCreation, UserList } from './Pages';
import { RootState } from './Store/Store';

const Routes = () => {
    const isLogged = useSelector((state: RootState) => state.coreReducer.isLogged);

    const PrivateRoute = ({redirectTo, authLogic, component: Component, ...rest }: any) => (
        <Route {...rest} render={(props) => (
            authLogic
            ? <Component {...props}/>
            : <Redirect to={redirectTo} />
        )} />
    );

    return (
        <Switch>
            <PrivateRoute authLogic={isLogged} redirectTo="/login" path="/" exact component={UserList} />
            <PrivateRoute authLogic={!isLogged} redirectTo="/" path="/login" component={Login} />
            <PrivateRoute authLogic={isLogged} redirectTo="/login" path="/create" component={UserCreation} />
            <PrivateRoute authLogic={isLogged} redirectTo="/login" path="/edit/:identifier" component={UserEdit} />
        </Switch>
    );
};

export default Routes;