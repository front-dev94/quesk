import React from 'react';
import {Redirect, Route} from 'react-router-dom';

// Components
import Profile from './../screens/profile/Profile';
import Dashboard from 'components/Dashboard';
import { QuestionPage } from 'components/Question';


// Constants
export const ROUTES = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/questions/:id',
        name: 'Question',
        component: QuestionPage
    },
    {
        path: '/profile',
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