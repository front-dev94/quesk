import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Row} from "reactstrap";

import PageContent from 'components/PageContent';
import BasicInfo from "./components/BasicInfo";
import ChangeUserInfo from './components/ChangeUserInfo';

import UserActions from './../../actions/userActions';

import './style.scss';

const PAGE_TITLE = "User profile";

const Profile = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const setUser = (user) => dispatch(UserActions.setUser(user));

  return (
    <PageContent className="profile-page" title={PAGE_TITLE}>
      <Row>
          <BasicInfo user={user} />
          <ChangeUserInfo user={user} setUser={setUser} />
      </Row>
    </PageContent>
  );
}

export default Profile;
