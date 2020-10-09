import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Profile from './../screens/profile/Profile';

// Constants
export const ROUTES = [
    {
        path: 'profile',
        name: 'Profile',
        component: Profile
    }
].map(item => ({
    ...item,
    exact: item.exact !== undefined ? item.exact : true,
    private: true
}))

export const PrivateRoute = ({ user, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (!user.accessToken) {
                // not logged in so redirect to login page
                return <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            }
            
            // authorised so return component
            return <Component {...props} />
        }} />
    );
}