import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { url } from 'src/router';

import Link from 'ui/common/Link';
import UserStore from 'data/stores/UserStore';

import styles from './style.less';


@observer class Main extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.box} />
          <div className={styles.box}>
            <h1>Sisteme hoş geldiniz {UserStore.user.email}</h1>
          </div>
          <div className={styles.box} />
        </div>
      </div>
    );
  }
}


export default Main;
