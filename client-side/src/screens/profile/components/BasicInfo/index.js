import React from 'react';
import PanelCard from 'components/PanelCard';
import './style.scss';

const BasicInfo = ({user}) => {
  return (
    <PanelCard className="basic-info-card" title="Basic info" lg={4}>
      <div className="info-box text-center">
        <div className="user-avatar">
          <i className="fe fe-user"></i>
        </div>
        <div className="name fw-600">
          {/* {user.username} */}
          Sejdalija
        </div>
        <div className="email">
          sejdalija@gmail.com
        </div>
      </div>
    </PanelCard>
  );
}

export default BasicInfo;