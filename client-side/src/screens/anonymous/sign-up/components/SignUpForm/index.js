import React from 'react';
import {Form, Formik} from "formik";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import InputBox, {PasswordBox} from "components/InputBox";
import signUpSchema from './signUpSchema';

const SignUpForm = ({onSubmit}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={signUpSchema}
      initialValues={{
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        hasError: undefined,
      }}
      render={props => {
        return (
          <Form>
            {props.values.hasError &&
              <div className="text-danger fs-13 pb-3">{props.values.hasError}</div>
            }
            <InputBox
              id="firstName"
              name="firstName"
              type="text"
              label="First name"
              {...props}
            />
            <InputBox
              id="lastName"
              name="lastName"
              type="text"
              label="Last name"
              {...props}
            />
            <InputBox
              id="username"
              name="username"
              type="text"
              label="Username"
              {...props}
            />
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

export default SignUpForm;
