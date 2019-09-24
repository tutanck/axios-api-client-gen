<h1 align="center">Welcome to axios-api-client-gen 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
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

gen('./path/to/destination/index.js', api);

```

## Author

👤 **tutanck**

- Twitter: [@tutanck](https://twitter.com/tutanck)
- Github: [@tutanck](https://github.com/tutanck)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
