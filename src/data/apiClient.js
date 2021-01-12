import axios from 'axios';
import querystring from 'querystring';
import _ from 'lodash';

import urls from 'src/urls';


const instance = axios.create({
  baseURL: process.env.API_URL || '//localhost:5001/api'
});
instance.interceptors.request.use(function(config) {
  const obj = { ...config };
  obj.headers['Content-Type'] = 'application/json';
  const cookie = localStorage.getItem('accessToken');
  if (cookie) {
    obj.headers['Authorization'] = `Bearer ${cookie}`;
  }
  return obj;
});


// @Api Utils
function makeParams(page, limit, filter) {
  const omittedFilter = _.omitBy(filter, val => !val);
  const params = {
    page,
    limit,
    filter: decodeURIComponent(querystring.stringify(omittedFilter, ';', ':'))
  };
  return _.omitBy(params, val => val === '');
}

// User
export const getUserProfile = () => instance.get(urls['current-user']());

export const login = data => instance.post(urls.login(), data);
export const register = data => instance.post(urls.register(), data);

