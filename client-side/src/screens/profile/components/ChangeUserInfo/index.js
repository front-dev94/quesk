import React, { useState } from 'react';
import PanelCard from './../../../../components/PanelCard';
import ChangeUserInfoForm from './components/ChangeUserInfoForm';
import UserService from '../../../../services/UserService';
import './style.scss';

const ChangeUserInfo = ({user, setUser, getData}) => {

  const handleSaveChanges = async (values, {resetForm, validateForm, setFieldValue}) => {
    const response = await UserService.updateUser(user.id, {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    });
    
    setFieldValue("hasError", false);

    if (!response.error) {
        resetForm();
        setUser(response);
    } else {
        setFieldValue("hasError", true);
        validateForm({});
    }
  }

  return (
    <PanelCard className="change-user-info-card" title="Change info" lg={8}>
      <ChangeUserInfoForm user={user} onSubmit={handleSaveChanges} />
    </PanelCard>
  );
}

export default ChangeUserInfo;