//Define all local scripts for future reference
const authentication = require('./authentication');
const searchstudentid = require('./searches/searchstudentid');
const getbyuid = require('./searches/getbyuid');
const getugnames = require('./triggers/getugnames')
const newugmembership = require('./triggers/newugmembership');
const createugmembership = require('./creates/createugm');

//Runs before any request is sent
const includeSessionKeyHeader = (request, z, bundle) => {
	//Adds the auth_token header onto every request, if auth_token is set in authData
  if (bundle.authData.auth_token) {
    request.headers = request.headers || {};
    request.headers['auth_token'] = bundle.authData.auth_token;
  }
  return request;
};

//If the response is a 401 (Authentication Fails), throw an error to refresh the auth token
const sessionRefreshIf401 = (response, z, bundle) => {
  if (bundle.authData.auth_token) {
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

  triggers: {
	  [getugnames.key]: getugnames, //Get Usergroup Names (for newugmembership)
	  [newugmembership.key]: newugmembership //Find a new usergroup membership
  },

  searches: {
	  [searchstudentid.key]: searchstudentid, //Search for user by student id
	  [getbyuid.key]: getbyuid //Get user by uid
  },

  creates: {
	  [createugmembership.key]: createugmembership //Create a new usergroup membership
  }
};

module.exports = App;
