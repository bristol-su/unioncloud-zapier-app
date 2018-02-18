// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
var caps = require('./../scripts/processArrays');
module.exports = {
  key: 'newugmembership',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'ugmembership',
  display: {
    label: 'New UserGroup Membership',
    description: 'Trigger when a new UseGroup Membership is created in a specific UserGroup.'
  },

  // `operation` is where the business logic goes.
  operation: {

    // `inputFields` can define the fields a user could provide,
    // we'll pass them in as `bundle.inputData` later.
    inputFields: [
    	 {
             key: 'ugid',
             required: true,
             dynamic: 'ugnames.id.name',
             altersDynamicFields:true,
             label: 'UserGroup ID',
             helpText: 'The ID of the UserGroup to search for a new membership.'
           },
    ],

    perform: (z, bundle) => {
	  return z.request({
		  method: 'GET',
		  url: 'https://'+bundle.authData.domain+'/api/user_groups/'+bundle.inputData.ugid+'/user_group_memberships?mode=full',
		  headers: {
			  'accept-version': 'v1',
			  'Content-Type': 'application/json',
		  },
	  }).then(response => {
		  console.log(response)
		  if (response.status >= 300) {
			  throw new Error(`Unexpected status code ${response.status}`);
		  }
		  var data = z.JSON.parse(response.content).data;
		  return caps(data);
		
	  });
    },
    
    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: 'Best Spagetti Ever',
      authorId: 1,
      directions: '1. Boil Noodles\n2.Serve with sauce',
      style: 'italian'
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'createdAt', label: 'Created At'},
      {key: 'name', label: 'Name'},
      {key: 'directions', label: 'Directions'},
      {key: 'authorId', label: 'Author ID'},
      {key: 'style', label: 'Style'}
    ]
  },

};