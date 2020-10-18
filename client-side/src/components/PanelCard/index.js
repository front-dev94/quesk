import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import {Col, Card, CardBody, CardTitle} from 'reactstrap';
import './style.scss';

const PanelCard = ({className, children, title, lg, md, sm, xs}) => {
  return (
    <Col lg={lg} md={md} sm={sm} xs={xs} className={classnames('panel-card', className)}>
      <Card>
        <CardBody>
          <CardTitle className="fw-600">{title}</CardTitle>
          {children}
        </CardBody>
      </Card>
    </Col>
  );
};

PanelCard.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  title: PropTypes.any,
  xs: PropTypes.number
};

PanelCard.defaultProps = {
  lg: 6,
  md: 12,
  sm: 6
};

export default PanelCard;
