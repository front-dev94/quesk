import React, {Component, Suspense} from 'react';
import {Router} from "react-router";
import {Redirect, Route, Switch} from 'react-router-dom';
import history from "store/history";
import { ROUTES, PrivateRoute } from 'routes';

// Components
import Header from './components/Header';
import ForgotPassword from './screens/anonymous/forgot-password';
import Login from './screens/anonymous/login/Login';
import ResetPassword from './screens/anonymous/reset-password/';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
    }
  } 

  renderRoutes = () => {
    const {user} = this.props;
    return ROUTES.map((route, idx) => {
      return (
        <PrivateRoute
          exact
          user={user}
          key={idx}
          path={route.path}
          component={route.component}
        />
      )
    });       
  }

  render() {
    const {user} = this.props;
    return (
      <Router history={history}>
        {user && <Header />}
        <Suspense fallback={<div>Loading</div>}>
            {user && <div className="app-container">
                <Switch>
                    {this.renderRoutes()}
                    {user && user.firstTimeLogin && <Redirect from="/" to={"/profile"}/>}
                </Switch>
            </div>}
            <Route exact path="/login" component={Login}/>
            {!user && <Redirect from="/" to="/login"/>}
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <Route exact path="/reset-password" component={ResetPassword}/>
        </Suspense>
      </Router>
    )
  }
}

export default App;
