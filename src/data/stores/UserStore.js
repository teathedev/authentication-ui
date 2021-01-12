import { observable, action } from 'mobx';

import {
  login,
  getUserProfile,
  register
} from 'data/apiClient';

import { history, url } from 'src/router';


window.USER = {};


class UserStore {
  constructor() {
    this.getUser();
  }

  @observable user = {}

  @observable levels = []

  @action
  getUser = () => {
    const request = getUserProfile();
    request.then((response) => {
      this.user = response.data;
      window.USER = response.data;
    });
    return request;
  }

  @action
  login(params) {
    const request = login(params);
    request.then((response) => {
      this.user = {};
      localStorage.setItem('accessToken', response.data.token);
      history.replace({
        pathname: url('home'),
        search: window.location.search
      });
    });
    return request;
  }

  @action
  register(params) {
    const request = register(params);
    request.then((response) => {
      this.user = {};
      localStorage.setItem('accessToken', response.data.token);
      history.replace({
        pathname: url('home'),
        search: window.location.search
      });
    });
    return request;
  }

  @action
  logout = () => {
    this.user = {};
    window.USER = {};
    localStorage.removeItem('accessToken');
    history.replace(url('login'));
  }
}


const userStore = new UserStore();

export default userStore;
