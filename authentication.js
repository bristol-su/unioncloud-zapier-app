var moment = require('./scripts/moment');
const testAuth = (z, bundle) => {
  // Normally you want to make a request to an endpoint that is either specifically designed to test auth, or one that
  // every user will have access to, such as an account or profile endpoint like /me.
  // In this example, we'll hit httpbin, which validates the Authorization Header against the arguments passed in the URL path
	var tohash = bundle.authData.email + bundle.authData.password + bundle.authData.app_id + moment().unix() + bundle.authData.app_password;
	 var hash = z.hash('sha256', tohash.toString());
	 const url = `https://bristol.unioncloud.org/api/authenticate`;
	 console.log(bundle);
	 const options = ({
		method: 'POST',
		form: {
			email: bundle.authData.email,
			password: bundle.authData.password,
			app_id: bundle.authData.app_id,
			date_stamp: moment().unix(),
			hash: hash
		}
	  });
		//  return responsePromise
		//    .then(response => z.JSON.parse(response.content));
	 

	return z.request(url, options)
		.then(response => {
		  if (response.status >= 401) {
			throw new Error(`Unexpected status code ${response.status}`);
		  }
		    var responses = z.JSON.parse(response.content).response;
	  for(var resp in responses){
		if(resp == "auth_token"){
			return true;
		}
	  }
	  return false;
		});
};
  // This method can return any truthy value to indicate the credentials are valid.

const getAuthToken = (z, bundle) => {
  var tohash = bundle.authData.email + bundle.authData.password + bundle.authData.app_id + moment().unix() + bundle.authData.app_password;
 var hash = z.hash('sha256', tohash.toString());
 const url = `https://bristol.unioncloud.org/api/authenticate`;
 const options = {
		method: 'POST',
		form: {
			email: bundle.authData.email,
			password: bundle.authData.password,
			app_id: bundle.authData.app_id,
			date_stamp: moment().unix(),
			hash: hash
		}
	  };
 

return z.request(url, options)
	.then(response => {
	  if (response.status >= 300) {
		throw new Error(`Unexpected status code ${response.status}`);
	  }
	  //console.log(response.json.response.auth_token);
	  // do any custom processing of recipes here...
	  var responses = z.JSON.parse(response.content).response;
	  for(var resp in responses){
		if(resp == "auth_token"){
			return {
			  auth_token: responses[resp] || 'new auth token!'
			};
		}
	  }
	});
};

module.exports = {
  type: 'session',
  // Define any auth fields your app requires here. The user will be prompted to enter this info when
  // they connect their account.
  fields: [
  {
		key: 'email',
		type: 'string',
		required: true,
		helpText: 'Email for the UnionCloud Account'
	  },
	{
		key: 'password',
		type: 'password',
		required: true,
		helpText: 'UnionCloud Account Password'
	  },
	{
		key: 'app_id',
		type: 'string',
		required: true,
		helpText: 'Your App ID'
	  },
	{
		key: 'app_password',
		type: 'password',
		required: true,
		helpText: 'Your App Password'
	  }
  ],
  // The test method allows Zapier to verify that the credentials a user provides are valid. We'll execute this
  // method whenver a user connects their account for the first time.
  test: testAuth,
  connectionLabel: '{{bundle.authData.email}} ({{bundle.authData.app_id}})',
  // The method that will exchange the fields provided by the user for session credentials.
  sessionConfig: {
    perform: getAuthToken
  }
};