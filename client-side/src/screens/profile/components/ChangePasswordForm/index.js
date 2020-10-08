import React from 'react';
import {Form, Formik} from "formik";
import {Button} from "reactstrap";
import InputBox from "components/InputBox";
import changePasswordSchema from "./changePasswordSchema";
import './style.scss';

const ChangePasswordForm = ({onSubmit}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      isInitialValid={true}
      validationSchema={changePasswordSchema}
      initialValues={{
        oldPassword: '',
        password: '',
        confirmPassword: "",
        hasError: undefined
      }}
      render={props => {
        return (
          <Form className="change-password-form">
            {props.values.hasError &&
              <div className="text-danger fs-13 pb-3">{props.values.hasError}</div>
            }
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

export default ChangePasswordForm;
