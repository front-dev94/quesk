import React from 'react';
import classnames from 'classnames';
import './style.scss';

const InfoBox = ({className, message}) => (
  <div className={classnames("info-box", className)}>
    {message}
  </div>

);

export default InfoBox;