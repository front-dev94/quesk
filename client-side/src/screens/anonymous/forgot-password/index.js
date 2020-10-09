import React from 'react';
import AnonymousForm from "components/AnonymousForm";
import ForgotPasswordForm from './components/ForgotPasswordForm';
import './style.scss';

class ForgotPassword extends React.Component {
  onSubmit = async (values, actions) => {
    actions.setFieldValue("hasError", undefined);
  };

  redirectToResetPwd = () => this.props.history.push('/reset-password');

  render() {
    return (
      <AnonymousForm
        className="forgot-password-form"
        title="Forgot password"
        description="Please enter your email address to request a password reset."
      >
        <ForgotPasswordForm onSubmit={this.onSubmit} />
      </AnonymousForm>
    );
  }
}

export default ForgotPassword;
