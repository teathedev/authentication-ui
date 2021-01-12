import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './style.less';


class Input extends React.Component {
  messageClasses = {
    suggestion: styles.suggestion,
    error: styles.error,
    warning: styles.warning,
    success: styles.success,
    successCheck: styles.successCheck,
    right: styles.right,
    bottom: styles.bottom
  };

  messages = {
    password: {
      suggestion: 'Please <br /> choose a password',
      error: 'Password <br /> needs to contain 6 characters.',
      warning: 'Password <br /> is not secure.',
      success: 'Your password is secure.'
    },
    passwordCompare: {
      suggestion: 'Please <br />your password again.',
      error: 'Passwords <br /> do not match',
      warning: '',
      success: ''
    },
    email: {
      suggestion: 'Please, write your email address.',
      error: 'Please, provide a valid email address.',
      warning: 'This email address is already registered.',
      success: ''
    },
    number: {
      suggestion: '',
      error: `Girdiğiniz değer ${this.props.numberMin} ile ${this.props.numberMax} arasında olmalıdır.`,
      warning: '',
      success: ''
    },
    fullname: {
      error: 'Write your name and surname.',
      success: ''
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      message: undefined,
      messageType: undefined,
      isValidated: props.isValidated
    };
  }

  componentDidMount() {
    this.inputRef.addEventListener('focusout', () => {
      this.setState({
        isActive: false
      }, () => {
        this.validateInput(this.props.type, this.state.value);
      });
    });
  }

  componentWillReceiveProps(nexProps) {
    if (this.props.isValidated != nexProps.isValidated) {
      this.setState({ isValidated: nexProps.isValidated }, () => {
        if (!nexProps.isValidated) {
          this.validateInput(this.props.type, this.state.value);
        }
      });
    }
  }

  onFocus = () => {
    if (!this.props.disabled) {
      this.setState({
        isActive: true
      }, () => {
        if (this.props.type === 'password' || this.props.type === 'email') {
          this.setState({
            message: undefined,
            messageType: undefined
          });
        }
      });
    }
  }

  onBlur = (e) => {
    if (!this.props.disabled && !this.props.onBlur) {
      this.setState({
        isActive: false
      }, () => {
        this.validateInput(this.props.type, this.state.value);
      });
    } else if (!this.props.disabled && this.props.onBlur) {
      this.props.onBlur(this.props.field, e);
    }
  }

  handleChange = (event) => {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onChange) {
      this.setState({ value: event.target.value });
      this.props.onChange(this.props.field, event);
    }
  }

  validateInput = (type, value) => {
    if (this.props.showMessages) {
      const compareWith = this.props.compareWith;
      if (this.props.field == 'fullname') {
        this.fullnameValidation(value);
      } else if (type == 'text') {
        this.textValidation(value);
      } else if (type == 'email') {
        this.emailValidation(value);
      } else if (type == 'password' && !compareWith) {
        this.passwordValidation(value);
      } else if (type == 'password' && compareWith) {
        this.passwordCompareValidation(value, compareWith);
      } else if (type == 'number' && this.props.numberMin && this.props.numberMax) {
        this.numberValidation(value, this.props.numberMin, this.props.numberMax);
      }
    }
  }

  textValidation = (value) => {
    if (!value) {
      this.setState({
        message: undefined,
        messageType: undefined
      });
    } else {
      this.setState({
        message: '',
        messageType: 'success'
      });
    }
  }

  fullnameValidation = (value) => {
    if (!value) {
      this.setState({
        message: undefined,
        messageType: undefined
      });
    } else if (value) {
      // eslint-disable-next-line
      const reg = /^[a-zA-Z\u00c0-\u024f\u1e00-\u1eff ]+$/;
      if (reg.test(value) && (value.indexOf(' ') > 0) && (value.indexOf(' ') < value.length - 1)) {
        this.setState({
          message: this.messages.fullname.success,
          messageType: 'success'
        });
      } else {
        this.setState({
          message: this.messages.fullname.error,
          messageType: 'error'
        });
      }
    }
  }

  emailValidation = (value) => {
    if (!value) {
      this.setState({
        message: undefined,
        messageType: undefined
      });
    } else if (value) {
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if (!emailValid) {
        this.setState({
          message: this.messages.email.error,
          messageType: 'error'
        });
      } else if (emailValid) {
        if (this.props.customMessage) {
          this.setState({
            messageType: 'error'
          });
        } else {
          this.setState({
            message: this.messages.email.success,
            messageType: 'success'
          });
        }
      }
    }
  }

  passwordValidation = (value) => {
    if (!value && !this.state.isActive) {
      this.setState({
        message: undefined,
        messageType: undefined
      });
    } else if (value == '' && this.state.isActive) {
      this.setState({
        message: this.messages.password.suggestion,
        messageType: 'suggestion'
      });
    } else if (value) {
      if (value.length > 0 && value.length < 6 && this.state.isActive) {
        this.setState({
          message: this.messages.password.warning,
          messageType: 'warning'
        });
      } else if (value.length > 0 && value.length < 6 && !this.state.isActive) {
        this.setState({
          message: this.messages.password.error,
          messageType: 'error'
        });
      } else if (value.length >= 6 && this.state.isActive) {
        this.setState({
          message: this.messages.password.success,
          messageType: 'success'
        });
      } else if (value.length >= 6 && !this.state.isActive) {
        this.setState({
          message: '',
          messageType: 'success'
        });
      }
    }
  }

  passwordCompareValidation = (value, compareValue) => {
    if (!value && !this.state.isActive) {
      this.setState({
        message: undefined,
        messageType: undefined
      });
    } else if (value == '' && this.state.isActive) {
      this.setState({
        message: '',
        messageType: 'suggestion'
      });
    } else if (value) {
      if (value != compareValue) {
        this.setState({
          message: this.messages.passwordCompare.error,
          messageType: 'error'
        });
      } else if (value == compareValue) {
        this.setState({
          message: '',
          messageType: 'success'
        });
      }
    }
  }

  numberValidation = (value, compareValueMin, compareValueMax) => {
    let validated = false;
    if (value) {
      const val = parseInt(value, 10);
      validated = (val >= compareValueMin) && (val <= compareValueMax);
    }

    if (!value && !this.state.isActive) {
      this.setState({
        message: undefined,
        messageType: undefined
      });
    } else if (value == '' && this.state.isActive) {
      this.setState({
        message: this.messages.number.suggestion,
        messageType: 'suggestion'
      });
    } else if (value) {
      if (!validated) {
        this.setState({
          message: this.messages.number.error,
          messageType: 'error'
        });
      } else if (validated) {
        this.setState({
          message: '',
          messageType: 'success'
        });
      }
    }
  }

  render() {
    const classes = cx(styles.root, this.props.className, {
      [styles.active]: this.state.value,
      [styles.disabled]: this.props.disabled,
      [this.messageClasses.success]: this.state.isValidated,
      [this.messageClasses.error]: this.state.isValidated == false,
      [this.messageClasses[this.state.messageType]]: this.state.messageType
    });
    const inputClasses = cx(styles.input, this.props.inputClassName);
    return (
      <div className={classes}>
        <input
          type={this.props.type}
          name={this.props.field}
          id={this.props.field}
          autoFocus={this.props.autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
          ref={node => this.props.inputRef(node)}
          className={inputClasses}
          placeholder={this.props.placeholder}
          value={this.props.value || ''}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={e => this.onBlur(e)}
          ref={(node) => { this.inputRef = node; }} // eslint-disable-line
          min={this.props.numberMin}
          max={this.props.numberMax}
          disabled={this.props.disabled}
          required={this.props.required}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={this.props.spellCheck}
        />
        {
          ((this.props.showMessages && this.state.message) || this.state.isValidated) &&
          <div
            className={cx(styles.message, {
              [this.messageClasses[this.props.messagePlacement]]: this.props.messagePlacement
            })}
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: this.state.message }}
          />
        }
        {this.props.customMessage &&
          <div
            className={cx(styles.message, styles.bottom, styles.errorCustom)}
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: this.props.customMessage.message }}
          />
        }
      </div>
    );
  }
}


Input.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  compareWith: PropTypes.string,
  numberMin: PropTypes.number, // only at type=number
  numberMax: PropTypes.number, // only at type=number
  field: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
  messagePlacement: PropTypes.oneOf(['right', 'bottom']),
  customMessage: PropTypes.object,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  showMessages: PropTypes.bool,
  onChange: PropTypes.func,
  isValidated: PropTypes.bool,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  spellCheck: PropTypes.bool,
  inputRef: PropTypes.func
};


Input.defaultProps = {
  className: '',
  inputClassName: '',
  placeholder: '',
  value: undefined,
  compareWith: undefined,
  numberMin: undefined,
  numberMax: undefined,
  type: 'text',
  messagePlacement: 'right',
  customMessage: undefined,
  disabled: false,
  autoFocus: false,
  showMessages: false,
  onChange() { },
  isValidated: undefined,
  onBlur() { },
  required: false,
  spellCheck: false,
  inputRef() {}
};

export default Input;
