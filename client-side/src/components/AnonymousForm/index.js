import React from 'react';
import './style.scss';

const AnonymousForm = ({className, title, description, children}) => (
  <div className={`anonymous-form ${className}`}>
    <div className="container">
      <div className="row">
        <div className="col mx-auto">
          <div className="text-center title">
            Quesk
          </div>
          <div className="card">
            <div className="card-body">
              <div className="card-title">{title}</div>
              <div className="card-description">
                {description}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AnonymousForm;
