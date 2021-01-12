# Authentication UI

### Understanding the Folder Structure

    .
    ├── README.md                     // documentation file
    ├── devServer.js                  // development server
    ├── index.html                    // main html file
    ├── package.json                  // dependencies
    ├── src                           // source code
    │   ├── App.js                    // main Component
    │   ├── config.js                 // app config
    │   ├── data                      // redux files
    │   │   ├── apiClient.js          // Axios requests
    │   │   └── stores                // MobX stores
    │   ├── index.js                  // main application file
    │   ├── ui                        // ui codes
    │   │   ├── apps                  // main components (referring by routes)
    │   │   ├── common                // common components
    │   │   ├── img                   // image files
    │   │   ├── less                  // global less files
    │   │   └── svg                   // svg files
    │   ├── urls.js                   // common urls
    │   └── utils                     // utilities
    ├── webpack.config.common.js      // common webpack config
    ├── webpack.config.dev.js         // webpack dev config
    └── webpack.config.prod.js        // webpack prod config
    
##### About The Structure
As you can see in the `Main` component in the apps directory, it can include its children components in the directory.
If one of the child component is needed by another component, it should take to the `common` directory.

##### Router
Basic data for router is like this;

```
import Register from 'ui/apps/Register';
...
{
  path: '/kayit',
  name: 'register',
  action: () => <Register />
}
...
```

Basic usage of the router should like be this in the ui.

```
import { url } from 'src/router';

import Link from 'ui/common/Link';
...
<Link to={url('register')} className={styles.btn}>
  Kayıt Ol
</Link>
```

Another usage of router can be like this.

```
import { history, url } from 'src/router';
...
onSubmit = (e) => {
  e.preventDefault();
  history.push(url('home'));
}
```


### Requirements

* Node 7+



##### Install Required Packages:

    $ brew install node


### Building the Project

##### Clone the repository and:

    $ git clone git@github.com:teathedev/authentication-ui.git
    $ cd authentication-ui

##### install requirements

    $ npm install

##### To run the project, Follow the following command:

    $ npm start
