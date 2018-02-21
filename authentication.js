var moment = require('./scripts/moment');
const testAuth = (z, bundle) => {
  /* Tests the authentication.
   * Unioncloud requires the following request body to be sent for an authentication request
   * email	This field is the email of the user account in UnionCloud used to access the API
   *password	This field is the password of the user account in UnionCloud used to access the API
   *app_id	This field is the developer name as set up in UnionCloud used to access the API
   *date_stamp	Unix current date time stamp
   *hash	SHA 256 Hash of the string concatenation "email"+"password"+"app_id"+"date_stamp"+"app_ password
   *
   *The function throws an error if the status is a 401, otherwise it will check the auth_token is present
   *in the response
   */
	var tohash = bundle.authData.email + bundle.authData.password + bundle.authData.app_id + moment().unix() + bundle.authData.app_password;
	 var hash = z.hash('sha256', tohash.toString());
	 const url = `https://`+bundle.authData.domain+`/api/authenticate`;
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

	return z.request(url, options)
		.then(response => {
		  if (response.status >= 401) {
			throw new Error("Authentication Failed");
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
	//This does the same as testAuth, but returns the bundle variables for the 
	//authtoken, connection label and domain.
  var tohash = bundle.authData.email + bundle.authData.password + bundle.authData.app_id + moment().unix() + bundle.authData.app_password;
 var hash = z.hash('sha256', tohash.toString());
 const url = `https://`+bundle.authData.domain+`/api/authenticate`;
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
		throw new Error("Authentication Failed.");
	  }
	  var responses = z.JSON.parse(response.content).response;
	  for(var resp in responses){
		if(resp == "auth_token"){
			return {
			  auth_token: responses[resp] || 'Auth Token',
			  connection_label: bundle.authData.connection_label || 'Connection Label',
			  domain: bundle.authData.domain || 'Your Domain'
			};
		}
	  }
	  throw new Error("Authentication Failed");
	});
};

module.exports = {
  type: 'session',
  // Fields required for authentication
  fields: [
  {
		key: 'connection_label',
		type: 'string',
		required: true,
		helpText: 'A label to help you remember your accounts.'
	  },		
  {
		key: 'domain',
		type: 'string',
		required: true,
		helpText: 'Domain of your union. For example, bristol.unioncloud.org'
	  },
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
  //test is called to verify whether the login worked or not
  test: testAuth,
  connectionLabel: '{{bundle.authData.connection_label}}',
  sessionConfig: { //Method to call to get auth token
    perform: getAuthToken
  }
};
