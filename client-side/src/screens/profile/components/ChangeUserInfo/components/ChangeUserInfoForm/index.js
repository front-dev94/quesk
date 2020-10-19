import React from 'react';
import {Form, Formik} from "formik";
import {Button} from "reactstrap";
import InputBox from '../../../../../../components/Input/InputBox';
import changeUserInfoSchema from "./changeUserInfoSchema";
import './style.scss';

const ChangeUserInfoForm = ({onSubmit, user}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      isInitialValid={true}
      validationSchema={changeUserInfoSchema}
      initialValues={{
        username: user && user.username || '',
        firstName: user && user.firstName || '',
        lastName: user && user.lastName || '',
        email: user && user.email || '',
        oldPassword: '',
        password: '',
        confirmPassword: "",
        hasError: false
      }}
      render={props => {
        return (
          <Form className="change-password-form">
            {props.values.hasError &&
              <div className="text-danger fs-13 pb-3">{props.values.hasError}</div>
            }
            <div className="d-flex">
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
            </div>
            <div className="d-flex">
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
                type="email"
                label="Email"
                {...props}
              />
            </div>
            <InputBox
              id="oldPassword"
              name="oldPassword"
              type="password"
              label="Current password"
              placeholder="Please enter your current password here"
              {...props}
            />
            <div className="d-flex">
              <InputBox
                id="password"
                name="password"
                type="password"
                label="New password"
                placeholder="Please enter your new password here"
                {...props}
              />
              <InputBox
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm password"
                placeholder="Please confirm your new password here"
                {...props}
              />
            </div>
            <div className="form-footer">
              <Button type="submit" disabled={!props.isValid}>Save Changes</Button>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default ChangeUserInfoForm;
