import React from 'react';
import { useDispatch } from 'react-redux';
import UserActions from './../../../actions/userActions';

import AnonymousForm from "components/AnonymousForm";
import SignUpForm from './components/SignUpForm';
import AuthService from './../../../services/AuthService';

import './style.scss';

const SignUp = (props) => {
  const dispatch = useDispatch();
  const setUser = (user) => dispatch(UserActions.setUser(user));

  const onSubmit = async (values, actions) => {
    const {hasError, ...credentials} = values;

    const user = await AuthService.signUp(credentials);
    actions.setFieldValue("hasError", false);

    if (!user.error) {
      await setUser(user);
      props.history.push('/')
    } else {
      actions.setFieldValue("hasError", true);
      actions.validateForm({});
    }
  };

  return (
    <AnonymousForm title="Register">
      <SignUpForm onSubmit={onSubmit} />
    </AnonymousForm>
  );
}

export default SignUp;
