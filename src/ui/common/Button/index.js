import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


const sizeClassess = {
  small: 'small',
  medium: 'medium',
  large: 'large'
};

const Button = (props) => {
  const classes = cx('btn', sizeClassess[props.size], props.className, {
    disabled: props.disabled,
    outline: props.outline,
    callToAction: props.callToAction
  });

  return (
    <button
      type={props.type}
      className={classes}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};


Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  callToAction: PropTypes.bool,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  onClick: PropTypes.func
};


Button.defaultProps = {
  className: '',
  type: 'button',
  size: 'small',
  callToAction: false,
  disabled: false,
  outline: false,
  onClick() { }
};

export default Button;
