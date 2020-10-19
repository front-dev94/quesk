import React from 'react';
import { useDispatch } from 'react-redux';

import AuthService from './../../../services/AuthService';
import UserActions from './../../../actions/userActions';

import AnonymousForm from "../../../components/AnonymousForm";
import LoginForm from './components/LoginForm';
import Alert from './../../../components/Alert';

import './style.scss';

const Login = (props) => {
  const dispatch = useDispatch();
  const setUser = (user) => dispatch(UserActions.setUser(user));

  const onSubmit = async (values, actions) => {
    const {hasError, ...credentials} = values;

    const response = await AuthService.login(credentials);

    if (!response.error) {
      await setUser(response);
      props.history.push('/');
    } else {
      actions.setFieldValue("hasError", true);
      actions.validateForm({});
    }
  };

  return (
    <AnonymousForm className="signin-form" title="Login to your account">
      <LoginForm onSubmit={onSubmit}/>
    </AnonymousForm>
  );
}

export default Login;