import React from 'react';
import {Link} from "react-router-dom";
import {Form, Formik} from "formik";
import {Button} from "reactstrap";
import InputBox, {PasswordBox} from "components/InputBox";
import loginSchema from "./loginSchema";

const LoginForm = ({onSubmit}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={loginSchema}
      initialValues={{
        username: '',
        password: '',
        hasError: false
      }}
      render={props => {
        return (
          <Form>
            {props.values.hasError &&
              <div className="text-danger fs-13 invalid-credentials">
                Your Email/Password was incorrect. Please try again.
              </div>
            }
            <InputBox
              id="username"
              name="username"
              type="text"
              label="Email"
              {...props}
            />
            <PasswordBox
              id="password"
              name="password"
              type="password"
              label="Password"
              wrapperClassName="m-0"
              {...props}
            />
            <div className="forgot-your-password text-right">
              {/* <Link to="/forgot-password">
                Forgot password?
              </Link> */}
            </div>
            <div className="form-footer">
              <Button type="submit" color="primary" block>Submit</Button>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default LoginForm;
