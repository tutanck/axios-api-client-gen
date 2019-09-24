const fs = require('fs');
const path = require('path');

const generate = function(filePath, api) {
  try {
    const parentDir = path.dirname(filePath);

    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir);
    }

    fs.writeFileSync(filePath, createFile(api));
    console.log(`[${new Date()}]: ${filePath} was created.`);
  } catch (err) {
    console.error(`[${new Date()}]:`, err.message);
  }
};

function createFile(api) {
  return `// ${new Date()}
  
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;
${api.map(service => getService(...service.split(' '))).join('')}
`;
}

function getService(method, route) {
  return (function(method, routeBase, routeName, routeParams) {
    const lastSeparator = routeParams.length > 0 ? ', ' : '';
    return `
export function ${method}${routeName}(${routeParams.join(
      ', ',
    )}${lastSeparator}...options) {
  return axios({
    baseURL: API_BASE_URL,
    method: '${method}',
    url: \`${routeBase}/${routeParams
      .map(param => '${' + param + '}')
      .join('/')}\`,
    ...options,
  });
}
`;
  })(method, ...fromRoute(route));
}

function fromRoute(route) {
  const [routeBase, ...routeParams] = route.split('/:');
  const routeName = routeBase.split('/').join('_');
  return [routeBase, routeName, routeParams];
}

module.exports = { generate };
