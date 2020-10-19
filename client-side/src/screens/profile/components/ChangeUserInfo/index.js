import React, { useState } from 'react';
import PanelCard from './../../../../components/PanelCard';
import ChangeUserInfoForm from './components/ChangeUserInfoForm';
import UserService from '../../../../services/UserService';
import './style.scss';

const ChangeUserInfo = ({user, setUser}) => {

  // const removeEmpty = (obj) => {
  //   return Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
  // }

  const handleSaveChanges = (values, actions) => {
  }

  return (
    <PanelCard className="change-user-info-card" title="Change info" lg={8}>
      <ChangeUserInfoForm user={user} onSubmit={handleSaveChanges} />
    </PanelCard>
  );
}

export default ChangeUserInfo;