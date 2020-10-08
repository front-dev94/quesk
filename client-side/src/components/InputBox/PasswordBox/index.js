import React from "react";
import {Button} from "reactstrap";
import {ReactComponent as EyeIcon} from "assets/images/eye.svg";
import InputBox from "../InputBox";
import './style.scss';

const TEXT_TYPE = 'text';
const PASSWORD_TYPE = 'password';

class PasswordBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  toggleShowPassword = () => this.setState({showPassword: !this.state.showPassword});

  render() {
    return (
      <React.Fragment>
        <InputBox {...this.props} type={this.state.showPassword ? TEXT_TYPE : PASSWORD_TYPE}>
          <div className="password-box-eye">
            <Button color="link" size="xs" onClick={this.toggleShowPassword}>
              <EyeIcon/>
            </Button>
          </div>
        </InputBox>
      </React.Fragment>
    );
  }
}

export default PasswordBox;