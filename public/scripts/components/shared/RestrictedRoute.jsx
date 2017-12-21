import React from 'react';
import { Route, Redirect } from 'react-router';

const RestrictedRoute = ({ allowed, userRole, redirect = '/app', component: Component, ...rest }) => {
    const canShow = allowed.indexOf(userRole) > -1 || allowed.length === 0 && !userRole;

    return (
        <Route {...rest} render={props => (

            !!canShow ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: redirect,
                    state: { from: props.location }
                }} />
            )
        )} />
    );
};

export default RestrictedRoute;
