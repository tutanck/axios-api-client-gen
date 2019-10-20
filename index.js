const fs = require("fs");
const path = require("path");
const setApi = require("./setApi");

const gen = function(filePath, routesMap, verbose = true) {
  const api = [];

  console.log("Routes : ");
  setApi(api, routesMap, verbose);

  console.log(`\nGenerating api-client in '${filePath} ..'\n`);

  try {
    const parentDir = path.dirname(filePath);

    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir);
    }

    fs.writeFileSync(filePath, createFile(api));

    console.log(`[${new Date()}]: ${filePath} was created.\n`);
  } catch (err) {
    console.error(`[${new Date()}]:`, err.message);
  }
};

function createFile(api) {
  return `// ${new Date()}
  
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;
${api.map(route => writeService(...route.split(" "))).join("")}
`;
}

function writeService(method, routeUrl) {
  return (function(method, routeName, routeParams, splittedUrl) {
    const lastSeparator = routeParams.length > 0 ? ", " : "";
    return `
export function ${method}${routeName}(${routeParams.join(
      ", "
    )}${lastSeparator}options) {
  return axios({
    baseURL: API_BASE_URL,
    method: '${method}',
    url: \`${splittedUrl
      .map(urlPortion =>
        isRouteParam(urlPortion)
          ? "${" + getRouteParam(urlPortion) + "}"
          : urlPortion
      )
      .join("/")}\`,
    ...options,
  });
}
`;
  })(method, ...fromRoute(routeUrl));
}

function fromRoute(routeUrl) {
  const splittedUrl = routeUrl.split("/");

  const routeParams = splittedUrl
    .filter(urlPortion => isRouteParam(urlPortion))
    .map(urlPortion => getRouteParam(urlPortion));

  const routeName = splittedUrl
    .map(urlPortion =>
      isRouteParam(urlPortion) ? urlPortion.replace(":", "by_") : urlPortion
    )
    .join("_");

  return [routeName, routeParams, splittedUrl];
}

function isRouteParam(urlPortion) {
  return urlPortion.startsWith(":");
}

function getRouteParam(urlPortion) {
  return isRouteParam(urlPortion) ? urlPortion.substring(1) : undefined;
}

module.exports = gen;