import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getIn } from "formik";
import './style.scss';

const Textarea = ({
  id,
  label,
  name,
  placeholder,
  size,
  touched,
  errors,
  children,
  wrapperClassName,
  className,
  handleBlur,
  handleChange,
  disabled,
  showError,
  minLength,
  maxLength,
  submitCount,
  autoComplete
}) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const hasError = (showError && touch && error) || (error && submitCount > 0);
  return (
    <div className={classnames("input-form-group", wrapperClassName)}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        className={classnames("form-control", className, size, hasError ? 'is-invalid' : '')}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
      {children}
      <small className="invalid-feedback">{hasError ? error : ' '}</small>
    </div>
  );
};

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  component: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.shape(),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  touched: PropTypes.shape(),
  wrapperClassName: PropTypes.string,
  showError: PropTypes.bool,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  submitCount: PropTypes.number
};

Textarea.defaultProps = {
  className: '',
  children: null,
  component: undefined,
  disabled: false,
  label: null,
  size: null,
  wrapperClassName: '',
  minLength: null,
  maxLength: null,
  errors: {},
  handleBlur: () => {},
  touched: {},
  showError: true,
  submitCount: 0
};

export default Textarea;
