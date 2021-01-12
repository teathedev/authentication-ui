import React, { Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';

import userStore from 'src/data/stores/UserStore';

import Button from 'ui/common/Button';
import Input from 'ui/common/Input';
import Link from 'ui/common/Link';

import { url } from 'src/router';

import styles from './style.less';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      validationErrors: []
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true, validationErrors: [] });
    const data = JSON.stringify({
      email: this.state.email,
      password: this.state.password
    });
    userStore.register(data).then().catch((err) => {
      this.setState({
        loading: false,
        validationErrors: err.response.data.error.details
      });
    });
  }

  getError = key => (
    _.find(this.state.validationErrors, item => item.context.key === key)
  )

  handleChange = (field, event) => {
    this.setState({
      [field]: event.target.value,
      validationErrors: []
    });
  }

  render() {
    const isButtonActive = (this.state.email != '' &&
      this.state.password != '');
    const emailError = this.getError('email');
    const passwordError = this.getError('password');
    const emailIsValidated = emailError ? emailError.message.length === 0 : null;
    const passwordIsValidated = passwordError ? passwordError.message.length === 0 : null;

    return (
      <div className={styles.root}>
        <div className={styles.actionBox}>
          <div className={styles.content}>
            <span className={styles.startTitle}>Register</span>
            <form className={styles.submitForm} id="form" autoComplete="off" onSubmit={this.onSubmit}>
              <div className={styles.inputTitle}>
                YOUR EMAIL.
              </div>
              <Input
                autoFocus
                field="email"
                type="text"
                key="email"
                tabIndex="0" // eslint-disable-line
                className={styles.input}
                inputClassName={styles.inputPlaceholder}
                inputRef={(node) => { this.mailInputRef = node; }}
                onChange={this.handleChange}
                value={this.state.email}
                messagePlacement="bottom"
                customMessage={emailError}
                isValidated={emailIsValidated}
              />
              <div className={styles.inputTitle}>
                YOUR PASSWORD
              </div>
              <Input
                field="password"
                type="password"
                key="password"
                tabindex="1" // eslint-disable-line
                className={styles.input}
                inputClassName={styles.inputPlaceholder}
                onChange={this.handleChange}
                value={this.state.password}
                messagePlacement="bottom"
                customMessage={passwordError}
                isValidated={passwordIsValidated}
              />
              <Button
                type="submit"
                size="large"
                tabindex="2" // eslint-disable-line
                onClick={this.onSubmit}
                disabled={!isButtonActive}
                className={cx('btn', styles.btn)}
                networkRequest
                loading={this.state.loading}
              >
                Login
              </Button>
            </form>
          </div>
          <p><Link to={url('login')}>Giriş Yap</Link></p>
        </div>
      </div>
    );
  }
}

export default Register;

