import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Login, UserEdit, UserCreation, UserList } from './Pages';
import { RootState } from './Store/Store';

const Routes = () => {
    const {coreReducer} = useSelector((state: RootState) => state);

    const PrivateRoute = ({redirectTo, authLogic, component: Component, ...rest }: any) => (
        <Route {...rest} render={(props) => (
            authLogic
            ? <Component {...props}/>
            : <Redirect to={redirectTo} />
        )} />
      )

    return (
        <Switch>
            <PrivateRoute authLogic={coreReducer.isLogged} redirectTo="/login" path="/" exact component={UserList} />
            <PrivateRoute authLogic={!coreReducer.isLogged} redirectTo="/" path="/login" component={Login} />
            <PrivateRoute authLogic={coreReducer.isLogged} redirectTo="/login" path="/create" component={UserCreation} />
            <PrivateRoute authLogic={coreReducer.isLogged} redirectTo="/login" path="/edit/:identifier" component={UserEdit} />
        </Switch>
    );
};

export default Routes;