import genUrl from 'src/utils/genUrl';


const pureUrls = {
  login: '/authentication/login',
  register: '/authentication/register',
  'current-user': '/authentication/me'
};


export { pureUrls };

export default genUrl(pureUrls);
