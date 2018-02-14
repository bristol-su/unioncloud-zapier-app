require('should');
const exampleauth = require('../authdata')
const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);
var authtok = "";
describe('Attempting Authentication', () => {
  it('Username and password accepted, auth token collected', (done) => {
    // Try changing the values of username or password to see how the test method behaves
    const bundle = {
      authData: {
        email: exampleauth.email,
        password: exampleauth.password,
		app_id: exampleauth.app_id,
		app_password: exampleauth.app_password
      }
    };

    appTester(App.authentication.sessionConfig.perform, bundle)
      .then((newAuthData) => {
		authtok = newAuthData.auth_token;
        done();
      })
      .catch(done);
  });
});
console.log("No test available on local testing for ensuring a 401 error leads to an auth token refresh.")
describe('Searching for a user by id (using tt15951)', () => {
  it('returns user details', (done) => {
	  const bundle = {
      authData: {
        auth_token: authtok
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
