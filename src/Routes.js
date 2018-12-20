import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './Containers/About'
import Login from './Containers/Login'
import Signup from './Containers/Signup'
import Legal from './Containers/Legal'
import Scan from './Containers/Scan'
import NotFound from "./Containers/NotFound";
import AuthRoute from "./Containers/Components/AuthRoute";
import UnAuthRoute from "./Containers/Components/UnAuthRoute";
import ProppedRoute from "./Containers/Components/ProppedRoute"

export default ({ childProps }) => (
    <Switch>
        <ProppedRoute
            exact
            path="/"
            component={About}
            props={childProps}
        />
        <UnAuthRoute
            exact
            path="/login"
            component={Login}
            props={childProps}
        />
        <UnAuthRoute
            exact
            path="/signup"
            component={Signup}
            props={childProps}
        />
        <AuthRoute
            exact
            path="/legal"
            component={Legal}
            props={childProps}
        />
        <AuthRoute
            exact
            path="/scan"
            component={Scan}
            props={childProps}
        />
        <Route component={NotFound} />
    </Switch>
);
