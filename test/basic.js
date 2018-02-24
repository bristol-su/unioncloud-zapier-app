require('should');
const zapier = require('zapier-platform-core');
zapier.tools.env.inject();
const App = require('../index');
const appTester = zapier.createAppTester(App);
describe('Attempting Authentication', () => { //Try to authenticate
  it('collects an auth token', (done) => {
	  const bundle = {
      authData: { //Required auth data, usually got from the user
    	domain: process.env.DOMAIN,
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
		app_id: process.env.APP_ID,
		app_password: process.env.APP_PASSWORD
      }
    };

    appTester(App.authentication.sessionConfig.perform, bundle)
      .then((newAuthData) => {
    	  newAuthData.should.have.property('auth_token');
    	  newAuthData.should.have.property('domain');
		process.env.AUTH_TOKEN = newAuthData.auth_token; //Set the auth token and domain
		process.env.DOMAIN = newAuthData.domain;
        done();
      })
      .catch(done);
  });
});
//No found way to test what happens with an expired auth_token
console.log("No test available on local testing for ensuring a 401 error leads to an auth token refresh.");


describe('Searching for a user by id (using tt15951)', () => {//search for a user by id
  it('returns user details', (done) => {
	  console.log(process.env);
	  const bundle = {
      authData: {
        auth_token: process.env.AUTH_TOKEN,
        domain: process.env.DOMAIN
      },
	  inputData: {
		  searchData: 'tt15951'
	  }
    };

    appTester(App.searches.searchstudentid.operation.perform, bundle)
      .then((resp) => {
    	 // resp.should.have.property('surname');
    	 // resp.should.have.property('uid');
    	 // resp.should.have.property('forename');
    	 // resp.should.have.property('id');
    	 // resp.should.have.property('email');
        done();
      })
      .catch(done);
  });
});

describe('Testing for a new UserGroup Membership', () => {
	  it('returns new ug membership', (done) => {
		  const bundle = {
	      authData: {
	        auth_token: process.env.AUTH_TOKEN,
	        domain: process.env.DOMAIN
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
	        auth_token: process.env.AUTH_TOKEN,
	        domain: process.env.DOMAIN
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
		        auth_token: process.env.AUTH_TOKEN,
		        domain: process.env.DOMAIN
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

describe('Create a UserGroup Membership', () => {
	  it('creates a usergroup membership', (done) => {
		  const bundle = {
		      authData: {
		        auth_token: process.env.AUTH_TOKEN,
		        domain: process.env.DOMAIN
		      },
			  inputData: {
				  uid: '2845746',
				  ug_id: '382125',
				  expiry: '22/09/2019',
			  }
		  };
	    appTester(App.creates.createugm.operation.perform, bundle)
	      .then((resp) => {
			  resp.should.have.property('uid');
			  resp.should.have.property('ug_id');
			  resp.should.have.property('ugm_id');
	        done();
	      })
	      .catch(done);
	  });
	});