import React from 'react';
import PanelCard from './../../../../components/PanelCard';

import './style.scss';

const BasicInfo = ({user}) => {
  return (
    user ? <PanelCard className="basic-info-card" title="Basic info" lg={4}>
      <div className="info-box text-center">
        <div className="user-avatar">
          <i className="fe fe-user"></i>
        </div>
        <div className="name fw-600">
          {user.username}
        </div>
        <div className="email">
          {user.email}
        </div>
      </div>
    </PanelCard> : <div />
  );
}

export default BasicInfo;