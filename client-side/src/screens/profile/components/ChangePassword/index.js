import React from 'react';
import PanelCard from 'components/PanelCard';
import ChangePasswordForm from "../ChangePasswordForm";
import './style.scss';

const CHANGE_PASSWORD_MODAL_DATA = {
  title: "Change password",
  message: "Successfully changed password"
};

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPasswordErrorMessage: false,
      passwordErrorMessage: ''
    };
  };

  componentDidMount() {
    
  }

  handleSaveChanges = async (values, actions) => {
    
  };

  render() {
    const {user} = this.props;
    const {showPasswordErrorMessage, passwordErrorMessage} = this.state;
    return (
      <PanelCard className="change-password-card" title="Change password" lg={8}>
        {user && user.firstTimeLogin &&
          <div className="text-danger fs-13 pb-3">
            You are logged in for the first time. You have to change your password to start using application.
          </div>
        }
        {showPasswordErrorMessage && <div className="text-danger fs-13 pb-3">{passwordErrorMessage}</div>}
        <ChangePasswordForm onSubmit={this.handleSaveChanges} />
      </PanelCard>
    );
  }
}

export default ChangePassword;