var caps = require('./../scripts/processArrays'); //Capitalisation
module.exports = {
  key: 'ticketsold',
  noun: 'Ticket',
  display: {
    label: 'Ticket Sold',
    description: 'Triggers when a ticket for a specific event is sold.'
  },
  operation: {
//Fields for the user to fill
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
		  headers: { //required headers
			  'accept-version': 'v1',
			  'Content-Type': 'application/json',
		  },
	  }).then(response => {
		  console.log(response)
		  if (response.status >= 300) { //Unexpected data
			  throw new Error("Error finding new UserGroup Memberships.");
		  }
		  var data = z.JSON.parse(response.content).data;
		  if(data == null){ //No usergroup memberships found
			  throw new Error("No UserGroup Memberships found");
		  }
		  return caps(data);
		
	  });
    },
    
    //Example Data
    sample: {
    	surname: "Twigger",
    	ug_name: "UserGroup Name",
    	end_date: "11-04-2018",
    	ug_type: "Custom",
    	ugm_id:	"65550699",
    	enabled: "true",
    	updated_at: "16-02-2018 13:52:10",
    	email: "tt159510@bristol.ac.uk",
    	ug_id: "382125",
    	forename: "Toby",
    	id:	"tt15951",
    	ugm_updated_at:	"14-02-2018 16:52:15",
    	start_date:	"14-02-2018",
    	uid: "2845746"
    },
    
    outputFields: [
		  //Can put keys here to better name them for a user
		  //{key: 'surname', label: 'Surname'}
			//Zapier will format keys by capitalising them and getting rid of underscores etc
	]
  },

};