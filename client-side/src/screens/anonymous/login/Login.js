import React, {Component} from 'react';
import { AuthService } from 'services';
import AnonymousForm from "components/AnonymousForm";
import LoginForm from './components/LoginForm';
import './style.scss';

class Login extends Component {
  onSubmit = async (values, actions) => {
    const {hasError, ...credentials} = values;

    const user = await AuthService.login(credentials);
    actions.setFieldValue("hasError", false);

    if (!user.error) {
      await this.props.setUser(user);
      this.props.history.push('/')
    } else {
      actions.setFieldValue("hasError", true);
      actions.validateForm({});
    }
  };

  render() {
    return (
      <AnonymousForm className="signin-form" title="Login to your account">
        <LoginForm onSubmit={this.onSubmit}/>
      </AnonymousForm>
    );
  }
}

export default Login;
