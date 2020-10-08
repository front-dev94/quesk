import React from 'react';
import classnames from 'classnames';
import './style.scss';

const PageContent = ({className, title, children}) => {
  return (
    <div className={classnames("page-content", className)}>
      <div className="page-title">{title}</div>
      {children}
    </div>
  );
};

export default PageContent;
