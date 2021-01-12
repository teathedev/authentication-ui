import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';
import { createBrowserHistory } from 'history';

import userStore from 'data/stores/UserStore';

import Main from 'ui/apps/Main';
import Login from 'ui/apps/Login';
import Register from 'ui/apps/Register';


let callback = () => { };
const history = createBrowserHistory({ forceRefresh: false });
let currentLocation = history.location;


// TODO: split the following object to the apps.
const routes = [
  {
    path: '',
    name: 'home',
    action: () => ({
      component: Main,
      props: { key: 'main' }
    })
  },
  {
    path: '/login',
    name: 'login',
    action: () => ({
      component: Login,
      props: { key: 'login' }
    })
  },
  {
    path: '/register',
    name: 'register',
    action: () => ({
      component: Register,
      props: { key: 'register' }
    })
  },
  {
    path: '/logout',
    name: 'logout',
    action: () => {
      userStore.logout();
    }
  }
];

const router = new UniversalRouter(routes);
const url = generateUrls(router);


function onLocationChange(location) {
  currentLocation = location;
  const loginExemptUrls = [
    url('login'),
    url('register'),
    url('logout')
  ];

  const isInWhiteList = loginExemptUrls.includes(location.pathname);
  if (!isInWhiteList) {
    userStore.getUser().then(() => {
      router.resolve({ pathname: location.pathname, search: location.search }).then((route) => {
        callback(route);
      });
    }).catch(() => {
      history.replace({
        pathname: url('login'),
        search: window.location.search
      });
    });
  } else {
    router.resolve({ pathname: location.pathname, search: location.search }).then((route) => {
      callback(route);
    });
  }
}

history.listen(onLocationChange);


export {
  history,
  url
};


export default function(fn) {
  onLocationChange(currentLocation);
  callback = fn;
}
