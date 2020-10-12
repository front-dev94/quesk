import React, {Component} from 'react';
import AnonymousForm from "components/AnonymousForm";
import SignUpForm from './components/SignUpForm';
import { AuthService } from 'services';

import './style.scss';

class SignUp extends Component {
  onSubmit = async (values, actions) => {
    const {hasError, ...credentials} = values;

    const user = await AuthService.signUp(credentials);
    actions.setFieldValue("hasError", false);

    if (!user.error) {
      await this.props.setUser(user);
      this.props.history.push('/')
    } else {
      actions.setFieldValue("hasError", true);
      actions.validateForm({});
    }
  };

  redirectToLogin = () => this.props.history.push('/login');

  render() {
    return (
      <AnonymousForm title="Register">
        <SignUpForm onSubmit={this.onSubmit} />
      </AnonymousForm>
    );
  }
}

export default SignUp;
