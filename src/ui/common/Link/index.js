import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { history } from 'src/router';


function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component {
  static propTypes = {
    to: PropTypes.string,
    children: PropTypes.any.isRequired,
    onClick: PropTypes.func
  }

  static defaultProps = {
    to: '',
    onClick() { }
  }

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    if (this.props.to && this.props.to != window.location.pathname) {
      history.push({
        pathname: this.props.to,
        search: window.location.search
      });
    }
  }

  render() {
    const { to, children, ...props } = this.props;
    return <a href={to} {...props} onClick={this.handleClick}>{children}</a>;
  }
}


export default Link;
