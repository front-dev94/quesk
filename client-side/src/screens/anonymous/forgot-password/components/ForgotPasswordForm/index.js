import React from 'react';
import {Link} from "react-router-dom";
import {Form, Formik} from "formik";
import {Button} from "reactstrap";
import InputBox from "components/InputBox";
import forgotPasswordSchema from "./forgotPasswordSchema";

const ForgotPasswordForm = ({onSubmit}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={forgotPasswordSchema}
      initialValues={{
        username: '',
        hasError: undefined
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
              type="email"
              label="Email"
              placeholder=""
              {...props}
            />
            <div className="form-footer">
              <Button type="submit" color="primary" block>Submit</Button>
              <div className="back-to-login text-center">
                {/* <Link to="/login">Back to login</Link> */}
              </div>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default ForgotPasswordForm;
