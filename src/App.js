import React, { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';

import userStore from 'data/stores/UserStore';

import 'normalize.css/normalize.css';
import 'ui/less/main.less';

import router from './router';


@observer
class App extends Component {
  constructor() {
    super();

    this.state = { route: null };
  }

  componentDidMount() {
    router((component) => {
      this.setState({ route: component });
    });
  }

  render() {
    return (
      <div className="RotaileShopAdmin_appWrapper">
        {this.state.route &&
          <this.state.route.component
            {...this.state.route.props}
            userStore={this.props.userStore}
            key={this.state.route.props.key}
          />}
      </div>
    );
  }
}

App.propTypes = {
  userStore: PropTypes.observableObject.isRequired
};

export default (() => (
  <App userStore={userStore} />
));
