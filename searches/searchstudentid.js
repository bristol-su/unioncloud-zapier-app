module.exports = {
  key: 'searchstudentid',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Users',
  display: {
    label: 'Search for a User by Student ID.',
    description: 'Search for a user by Student ID and get all information UnionCloud holds on the user.'
  },

  // `operation` is where we make the call to your API to do the search
	operation: {
        // an array of objects is the simplest way
        inputFields: [
          {
            key: 'searchData',
            required: true,
            label: 'Student ID',
            helpText: 'The student ID should be of the format xy12345.'
          },
        ],
         perform: (z, bundle) => {
			  const options = {
				  data: {
					  id: bundle.inputData.searchData
				  }
			  };
        	  return z.request({
        		  method: 'POST',
        	      url: 'https://'+bundle.authData.domain+'/api/users/search?mode=basic',
        	      headers: {
        		      'accept-version': 'v1',
					   'Content-Type': 'application/json',
        		  },
        		  body: options
        	    }).then(response => {
				  if (response.status >= 300) {
					throw new Error(`Unexpected status code ${response.status}`);
				  }
				  var data = z.JSON.parse(response.content).data;
					return data;
					
				});
         },
         
			// In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
			// from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
			// returned records, and have obviously dummy values that we can show to any user.
			sample: {
			  
				surname: 'Twigger',
				uid: '2845746',
				updated_at:	'29-01-2018 12:27:45',
				email: 'tt15951@bristol.ac.uk',
				forename: 'Toby',
				id:	'tt15951',
			},

			// If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
			// field definitions. The result will be used to augment the sample.
			// outputFields: () => { return []; }
			// Alternatively, a static field definition should be provided, to specify labels for the fields
			outputFields: [
			  {key: 'surname', label: 'Surname'},
			  {key: 'uid', label: 'Uid At'},
			  {key: 'updated_at', label: 'Last Updated'},
			  {key: 'email', label: 'Email Address'},
			  {key: 'forename', label: 'Forename'},
			  {key: 'id', label: 'Student ID'}
			]
		  }
};


   