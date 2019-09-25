const setApi = function(api, map, verbose = true, route) {
  route = route || "";
  for (var key in map) {
    switch (typeof map[key]) {
      case "object":
        setApi(api, map[key], verbose, route + key);
        break;
      case "function":
        if (verbose) console.log("* %s %s", key, route);
        api.push(`${key} ${route}`);
        break;
    }
  }
};

module.exports = setApi;
