import React from 'react';
import {Link} from "react-router-dom";
import {Form, Formik} from "formik";
import {Button} from "reactstrap";
import InputBox from "components/InputBox";
import resetPasswordSchema from "./resetPasswordSchema";

const LoginForm = ({onSubmit}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={resetPasswordSchema}
      initialValues={{
        username: '',
        confirmationCode: '',
        password: '',
        confirmPassword: '',
        hasError: undefined,
      }}
      render={props => {
        return (
          <Form>
            {props.values.hasError &&
              <div className="text-danger fs-13 pb-3">{props.values.hasError}</div>
            }
            <InputBox
              id="username"
              name="username"
              type="text"
              label="Email"
              {...props}
            />
            <InputBox
              id="confirmationCode"
              name="confirmationCode"
              type="text"
              label="Confirmation code"
              {...props}
            />
            <InputBox
              id="password"
              name="password"
              type="password"
              label="New password"
              {...props}
            />
            <InputBox
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Repeat password"
              {...props}
            />
            <div className="form-footer">
              <Button type="submit" color="primary" block>Submit</Button>
              <div className="back-to-login text-center">
                <Link to="/login">Back to login</Link>
              </div>
            </div>
          </Form>
        );
      }}
/>
)
  ;
};

export default LoginForm;
