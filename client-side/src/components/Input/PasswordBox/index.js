import React, { useState } from "react";
import {Button} from "reactstrap";
import InputBox from "../InputBox";

import {ReactComponent as EyeIcon} from "assets/images/eye.svg";

import './style.scss';

const TEXT_TYPE = 'text';
const PASSWORD_TYPE = 'password';

const PasswordBox = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <React.Fragment>
      <InputBox {...props} type={showPassword ? TEXT_TYPE : PASSWORD_TYPE}>
        <div className="password-box-eye">
          <Button color="link" size="xs" onClick={() => toggleShowPassword()}>
            <EyeIcon/>
          </Button>
        </div>
      </InputBox>
    </React.Fragment>
  )
}

export default PasswordBox;