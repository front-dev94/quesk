import React, {Fragment} from 'react';
import { Col } from 'reactstrap';

import './style.scss';

const UserCard = ({user, isTopPerformer}) => {
  return (
    <Fragment>
        {user && <Col sm={12} md={4} lg={4}>
            <div className="user-item">
            {isTopPerformer &&  <div className="user-badge">
                <i className="fe fe-award"></i>
            </div>}
            <div className="user-info text-center">
                <div className="user-avatar">
                    <i className="fe fe-user"></i>
                </div>
                <div className="name fw-600">
                    {user.username}
                </div>
                <div className="email">
                    {user.email}
                </div>
                <div className="score">
                    <i className="fe fe-message-square"></i>
                    <span>Answers: <strong>{user.answerScore}</strong></span>
                </div>
            </div>
            </div>
        </Col>}
    </Fragment>
  )
}

export default UserCard;