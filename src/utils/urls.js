import pathToRegexp from "path-to-regexp";

// This function process any url/path given path regex and config options
// - pathRegex: is the regex by which we can construct actual url, format is similar to react-router route urls
// - config options: when we pass { path: true } in options it will return plain path regex otherwise it will return compiled path with actual parameter values
// For e.g. when we define react-router routes , we need path regex with parameter placement holder
// so at that time pass { path : true } with will directly return pathRegex
// Suppose in case we need actual url to redirect at that time pass parameters values with { path : false } & it will return actual url to redirect
const processURL = (pathRegex, { path, ...params } = {}) => {
  if (path) {
    return pathRegex;
  }
  // if pathRegex = `servers/:id` and params = {id: '123'}
  // then this function will return `servers/123`
  const toPath = pathToRegexp.compile(pathRegex);
  return toPath(params, { encode: (value, token) => value });
};

const abstractURL = pathRegex => (options) =>
  processURL(pathRegex, options);

export default {
  HOME: abstractURL("/"),
  USERS: abstractURL("/users"),
};
