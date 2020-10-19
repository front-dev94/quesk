import React from 'react';
import classnames from 'classnames';
import './style.scss';

const PageContent = ({className, title, children}) => {
  return (
    <div className={classnames("page-layout", className)}>
      <div className="page-top-bg"></div>
      <div className="page-content">
        <div className="container">
          <div className="page-title">{title}</div>
          <div className="page-card">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContent;
