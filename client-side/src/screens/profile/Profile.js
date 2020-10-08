import React from 'react';
import {Row, Col} from "reactstrap";
import PageContent from 'components/PageContent';
import BasicInfo from "./components/BasicInfo";
import ChangePassword from "./components/ChangePassword";

import './style.scss';

const PAGE_TITLE = "User profile";

class Profile extends React.Component {
  render() {
    const {user, setUser} = this.props;
    return (
      <PageContent className="profile-page" title={PAGE_TITLE}>
        <Row>
            <BasicInfo user={user} />
            <ChangePassword user={user} setUser={setUser} />
        </Row>
      </PageContent>
    );
  }
}

export default Profile;
