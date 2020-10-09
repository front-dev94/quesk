import React from 'react';
import AnonymousForm from "components/AnonymousForm";
import ResetPasswordForm from './components/ResetPasswordForm';
import './style.scss';

class ResetPassword extends React.Component {
  onSubmit = async (values, actions) => {
   
  };

  redirectToLogin = () => this.props.history.push('/login');

  render() {
    return (
      <AnonymousForm
        className="reset-password-form"
        title="Reset password"
        description="Please enter your new password. Once changed, your new password will be in effect next time you login."
      >
        <ResetPasswordForm onSubmit={this.onSubmit} />
      </AnonymousForm>
    );
  }
}

export default ResetPassword;
