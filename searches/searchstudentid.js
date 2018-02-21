var caps = require('./../scripts/processArrays'); //Capitalise the names correctly.
module.exports = {
  key: 'searchstudentid',
  noun: 'Users',
  display: {
    label: 'Search for a User by Student ID.',
    description: 'Search for a user by Student ID and get all information UnionCloud holds on the user.'
  },

	operation: {
        inputFields: [
          {
            key: 'searchData',
            required: true,
            label: 'Student ID',
            helpText: 'The student ID should be of the format xy12345.'
          },
        ],
         perform: (z, bundle) => {
			  const options = { //set the body to have an id given
				  data: {
					  id: bundle.inputData.searchData
				  }
			  };
        	  return z.request({
        		  method: 'POST',
        	      url: 'https://'+bundle.authData.domain+'/api/users/search?mode=standard',
        	      headers: {//required headers for the request
        		      'accept-version': 'v1',
					   'Content-Type': 'application/json',
        		  },
        		  body: options
        	    }).then(response => {
				  if (response.status >= 300) { //Unexpected status code
					throw new Error("Searching for user failed.");
				  }
				  var data = z.JSON.parse(response.content).data;
				  if(data == null){ //happens for no users
					  throw new Error("No users found.");
				  }
				  return caps(data); //capitalise the name correctly
					
				});
         },
         
			// Sample Data
			sample: {
			  
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


   