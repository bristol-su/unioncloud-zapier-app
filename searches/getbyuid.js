var caps = require('./../scripts/processArrays');
module.exports = {
  key: 'getuserbyuid',
  noun: 'Users',
  display: {
    label: 'Get a User by uID.',
    description: 'Fetch details of a specific user by uID'
  },
	operation: {
        inputFields: [
          {
            key: 'uid',
            required: true,
            label: 'uID',
            helpText: 'This can be found on UnionCloud.'
          },
        ],
         perform: (z, bundle) => {
        	  return z.request({
        		  method: 'GET',
        		  url: 'https://'+bundle.authData.domain+'/api/users/'+bundle.inputData.uid+'?mode=standard',
        	      headers: {
        		      'accept-version': 'v1',
					  'Content-Type': 'application/json',
        		  },
        	    }).then(response => {
				  if (response.status >= 300) { //Something went wrong!
					throw new Error("Failed getting a user by uID.");
				  }
				  var data = z.JSON.parse(response.content).data;
				  if(data == null){ //No users with that uid
					  throw new Error("No users found.")
				  }
				  return caps(data); //fix capitalisation
					
				});
         },
         
			sample: { //Sample Data
			  
				surname: 'Twigger',
				uid: '2845746',
				updated_at:	'29-01-2018 12:27:45',
				email: 'tt15951@bristol.ac.uk',
				forename: 'Toby',
				id:	'tt15951',
			},

			outputFields: [
				  //Can put keys here to better name them for a user
				  //{key: 'surname', label: 'Surname'}
					//Zapier will format keys by capitalising them and getting rid of underscores etc
			]
		  }
};


   