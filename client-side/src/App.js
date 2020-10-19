import React, {Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {Router} from "react-router";
import {Route, Switch} from 'react-router-dom';
import history from './store/history';
import { ROUTES, PublicRoute } from './routes';
import {UserActions} from "./actions";
import AuthHelper from "./utils/helpers/authHelper";

// Components
import Header from './components/Header';
import Login from './screens/anonymous/login';
import SignUp from './screens/anonymous/sign-up';

import './App.scss';

const App = (props) => {
  const user = useSelector(state => state.user);
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = AuthHelper.getUser();
    if (user){
      setUser(user);
    }
    setIsReady(true);
  }, []);

  const setUser = (user) => dispatch(UserActions.setUser(user));

  const logout = () => {
    setUser(null);
  }

  const renderRoutes = () => {
    return ROUTES.map((route, idx) => {
      return (
        <Route
          exact
          user={user}
          key={idx}
          path={route.path}
          component={route.component}
        />
      )
    });       
  }

  if (!isReady)
    return <div/>

    return (
      <Router history={history}>
        <Suspense fallback={<div>Loading</div>}>
          <div className="main">
            <Header user={user} history={history} logout={logout}/>
            <Suspense fallback={<div>Loading</div>}>
              <Switch>
                {renderRoutes()}
              </Switch>
            </Suspense>
          </div>
          <PublicRoute exact path="/login" component={Login}/>
          <PublicRoute exact path="/sign-up" component={SignUp}/>
        </Suspense>
      </Router>
    )
}

export default App;