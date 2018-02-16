const authentication = require('./authentication');
const searchstudentid = require('./searches/searchstudentid');
const getbyuid = require('./searches/getbyuid');
const getugnames = require('./triggers/getugnames')
const newugmembership = require('./triggers/newugmembership');

// To include the session key header on all outbound requests, simply define a function here.
// It runs runs before each request is sent out, allowing you to make tweaks to the request in a centralized spot
const includeSessionKeyHeader = (request, z, bundle) => {
  if (bundle.authData.auth_token) {
    request.headers = request.headers || {};
    request.headers['auth_token'] = bundle.authData.auth_token;
  }
  return request;
};

// If we get a response and it is a 401, we can raise a special error telling Zapier to retry this after another exchange.
const sessionRefreshIf401 = (response, z, bundle) => {
  if (bundle.authData.auth_token) {
	  z.console.log(response);
	  if (response.status === 401) {
		  throw new z.errors.RefreshAuthError() 
	  }
  }
  return response;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [
    includeSessionKeyHeader
  ],

  afterResponse: [
	  sessionRefreshIf401
  ],

  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
	  [getugnames.key]: getugnames,
	  [newugmembership.key]: newugmembership
  },

  // If you want your searches to show up, you better include it here!
  searches: {
	  [searchstudentid.key]: searchstudentid,
	  [getbyuid.key]: getbyuid
  },

  // If you want your creates to show up, you better include it here!
  creates: {
  }
};

// Finally, export the app.
module.exports = App;
