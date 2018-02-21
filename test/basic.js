require('should');
const exampleauth = require('../authdata')
const zapier = require('zapier-platform-core');
const App = require('../index');
const appTester = zapier.createAppTester(App);
var authtok = ""; //save the auth token her
var domain = ""; //save the domain here 
describe('Attempting Authentication', () => { //Try to authenticate
  it('collects an auth token', (done) => {
	  const bundle = {
      authData: { //Required auth data, usually got from the user
    	domain: exampleauth.domain,
        email: exampleauth.email,
        password: exampleauth.password,
		app_id: exampleauth.app_id,
		app_password: exampleauth.app_password
      }
    };

    appTester(App.authentication.sessionConfig.perform, bundle)
      .then((newAuthData) => {
		authtok = newAuthData.auth_token; //Set the auth token and domain
		domain = newAuthData.domain;
        done();
      })
      .catch(done);
  });
});
//No found way to test what happens with an expired auth_token
console.log("No test available on local testing for ensuring a 401 error leads to an auth token refresh.");


describe('Searching for a user by id (using tt15951)', () => {//search for a user by id
  it('returns user details', (done) => {
	  const bundle = {
      authData: {
        auth_token: authtok,
        domain: domain
      },
	  inputData: {
		  searchData: 'tt15951'
	  }
    };

    appTester(App.searches.searchstudentid.operation.perform, bundle)
      .then((resp) => {
    	  console.log(resp);
        done();
      })
      .catch(done);
  });
});

describe('Testing for a new UserGroup Membership', () => {
	  it('returns new ug membership', (done) => {
		  const bundle = {
	      authData: {
	        auth_token: authtok,
	        domain: domain
	      },
		  inputData: {
			  ugid: '382125'
		  }
	    };

	    appTester(App.triggers.newugmembership.operation.perform, bundle)
	      .then((resp) => {
	        done();
	      })
	      .catch(done);
	  });
	});

describe('Getting all UserGroup Names', () => {
	  it('returns all usergroup names', (done) => {
		  const bundle = {
	      authData: {
	        auth_token: authtok,
	        domain: domain
	      }
	    };

	    appTester(App.triggers.ugnames.operation.perform, bundle)
	      .then((resp) => {
	        done();
	      })
	      .catch(done);
	  });
	});

describe('Search for a user by UID', () => {
	  it('returns specific user', (done) => {
		  const bundle = {
		      authData: {
		        auth_token: authtok,
		        domain: domain
		      },
			  inputData: {
				  uid: '2845746',
			  }
		  };
	    appTester(App.searches.getuserbyuid.operation.perform, bundle)
	      .then((resp) => {
			  console.log(resp);
	        done();
	      })
	      .catch(done);
	  });
	});