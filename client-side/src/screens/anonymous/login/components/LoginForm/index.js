import React from 'react';
import {Link} from "react-router-dom";
import {Form, Formik} from "formik";
import {Button} from "reactstrap";
import InputBox from '../../../../../components/Input/InputBox';
import PasswordBox from '../../../../../components/Input/PasswordBox';
import loginSchema from "./loginSchema";

const LoginForm = ({onSubmit}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={loginSchema}
      initialValues={{
        email: '',
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
              id="email"
              name="email"
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
            <div className="form-footer">
              <Button type="submit" color="primary" block>Submit</Button>
              <div className="back-to-login text-center">
                <Link to="/sign-up">Create an account</Link>
              </div>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default LoginForm;
