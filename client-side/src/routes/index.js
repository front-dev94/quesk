import React from 'react';
import {Redirect, Route} from 'react-router-dom';

// Components
import Profile from './../screens/profile';
import Home from './../components/Home';
import MyQuestions from './../components/Question/components/MyQuestions';
import QuestionPage from './../components/Question/components/QuestionPage';

// Constants
export const ROUTES = [
    {
        path: '/',
        name: 'Home',
        component: Home
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
    },
    {
        path: '/profile/my-questions',
        name: 'My questions',
        component: MyQuestions
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

export const PublicRoute = ({ user, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            // authorised so return component
            return <Component {...props} />
        }} />
    );
}