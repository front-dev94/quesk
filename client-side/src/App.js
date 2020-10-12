import React, {Component, Suspense} from 'react';
import {Router} from "react-router";
import {Redirect, Route, Switch} from 'react-router-dom';
import history from "store/history";
import { ROUTES, PrivateRoute } from 'routes';
import {connect} from 'react-redux';
import {UserActions} from "actions";
import AuthHelper from "utils/helpers/authHelper";

// Components
import Header from './components/Header';
import Login from './screens/anonymous/login';
import SignUp from './screens/anonymous/sign-up';
import Profile from './screens/profile';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
    }
  }

  async componentDidMount() {
    const user = AuthHelper.getUser();
    if (user) {
        await this.props.setUser(user);
    }
    this.setState({
        isReady: true
    })
  }

  logout = async () => {
      this.props.setUser(null);
  };

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
    const {isReady} = this.state;
    if (!isReady) {
        return <div/>
    }
    const {user} = this.props;
    return (
      <Router history={history}>
        {user && <Header user={user} history={history} logout={this.logout}/>}
        <Suspense fallback={<div>Loading</div>}>
            {user && <div className="app-container">
                <div className="container">
                  <Switch>
                      {this.renderRoutes()}
                      <Route exact path="/profile" component={Profile}/>
                  </Switch>
                </div>
            </div>}
            <Route exact path="/login" component={Login}/>
            <Route exact path="/sign-up" component={SignUp}/>
            {!user && <Redirect from="/" to="/login"/>}
        </Suspense>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(UserActions.setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
