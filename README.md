<h1 align="center">Welcome to axios-api-client-gen 👋</h1>
<p>
  <a href="https://github.com/tutanck/axios-api-client-gen" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://twitter.com/tutanck" target="_blank">
    <img alt="Twitter: tutanck" src="https://img.shields.io/twitter/follow/tutanck.svg?style=social" />
  </a>
</p>

> Generate complete api client from express route map using axios

## Install

```sh
npm i axios-api-client-gen
```

## How it works

Asume you have an express route map like this ([see example here](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)):

```Javascript
const api = {
  '/users': {
    get: users.list,
    delete: users.delete,
    '/:uid': {
      get: users.get,
      '/pets': {
        get: pets.list,
        '/:pid': {
          delete: pets.delete
        }
      }
    }
  }
};

app.map(api);
```

With `axios-api-client-gen` you can generate the complete api-client in seconds.

## Usage

```Javascript
const gen = require('axios-api-client-gen');

// gen('path/to/file.js', apiMap, verbose(optional), API_BASE_URL(optional))
gen('./client/index.js', api, true, "MY_API_BASE_URL");

```

## Expected Result

> A file `'./client/index.js'` containing :

```Javascript
// Mon Oct 21 2019 03:32:02 GMT+0200 (GMT+02:00)
  
import axios from 'axios';

const API_BASE_URL = process.env.MY_API_BASE_URL;

export function get_users(options) {
  return axios({
    baseURL: API_BASE_URL,
    method: 'get',
    url: `/users`,
    ...options,
  });
}

export function delete_users(options) {
  return axios({
    baseURL: API_BASE_URL,
    method: 'delete',
    url: `/users`,
    ...options,
  });
}

export function get_users_by_uid(uid, options) {
  return axios({
    baseURL: API_BASE_URL,
    method: 'get',
    url: `/users/${uid}`,
    ...options,
  });
}

export function get_users_by_uid_pets(uid, options) {
  return axios({
    baseURL: API_BASE_URL,
    method: 'get',
    url: `/users/${uid}/pets`,
    ...options,
  });
}

export function delete_users_by_uid_pets_by_pid(uid, pid, options) {
  return axios({
    baseURL: API_BASE_URL,
    method: 'delete',
    url: `/users/${uid}/pets/${pid}`,
    ...options,
  });
}
```

## Full Working Example
> You can checkout the full working example [HERE](https://github.com/tutanck/axios-api-client-gen-example)

## Author

👤 **tutanck**

- Twitter: [@tutanck](https://twitter.com/tutanck)
- Github: [@tutanck](https://github.com/tutanck)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />I recently fell in ❤️ with [25](https://www.youtube.com/watch?v=SNS2tOGGGRk) and issues! <br />Feel free to check [issues page](https://github.com/tutanck/axios-api-client-gen/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
