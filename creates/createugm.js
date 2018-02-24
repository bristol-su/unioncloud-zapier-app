module.exports = {
  key: 'createugm',
  noun: 'UserGroup Membership',
  display: {
    label: 'Add a User to a UserGroup.',
    description: 'Create a UserGroup Membership.'
  },
	operation: {
        inputFields: [
          {
			key: 'uid',
			required: true,
			label: 'uID',
			helpText: 'This can be found on UnionCloud.'
          },
          {
			  key: 'ug_id',
			  required: true,
			  dynamic: 'ugnames.id.name', //Auto populate using all usergroup names dropdown
			  altersDynamicFields:true,
			  label: 'UserGroup',
			  helpText: 'Please select the UserGroup to add a member to.'
          },	
          {
              key: 'expiry',
              type: 'string',
              required: true,
              label: 'Expiry',
              helpText: 'Date on which the UserGroup Membership will expire and the user removed from the UserGroup. This must be in the format DD/MM/YYYY.'
          },
        ],
         perform: (z, bundle) => {
        	  const options = { //set the body to have required data
   				  data: {
   					  uid: bundle.inputData.uid,
   					  ug_id: bundle.inputData.ug_id,
   					  expire_date: bundle.inputData.expiry,
   				  }
   			  };
        	  //Ensure the date is in the correct format.
        	  var regex = "^(((((0[1-9])|(1\d)|(2[0-8]))\/((0[1-9])|(1[0-2])))|((31\/((0[13578])|(1[02])))|((29|30)\/((0[1,3-9])|(1[0-2])))))\/((20[0-9][0-9])|(19[0-9][0-9])))|((29\/02\/(19|20)(([02468][048])|([13579][26]))))$";
        	  if(bundle.inputData.expiry.match(regex) == null){
        		  throw new Error("Please enter a date in the correct format.")
        	  }
        	  return z.request({
        		  method: 'POST',
        		  url: 'https://'+bundle.authData.domain+'/api/user_group_memberships',
        	      headers: {
        		      'accept-version': 'v1',
					  'Content-Type': 'application/json',
        		  },
        		  body: options, //required fields
        	    }).then(response => {
				  if (response.status >= 300) { //Something went wrong!
					throw new Error("Failed creating the UserGroup Membership.");
				  }
				  var data = z.JSON.parse(response.content).data;
				  if(data["0"]["errors"] != null){ //An error occured
					  if(data["0"]["errors"]["0"]["error_code"] == "ERR312"){
						  throw new Error("The user is already in this UserGroup!")
					  }
					  throw new Error("An error occured in creation of the UserGroup Membership.")
				  }
				  return data["0"];
					
				});
         },
         
		sample: { //Sample Data
			ugm_id: '73827473',
			uid: '2845746',
			ug_id:	'372954',
		},
	
		outputFields: [
			  //Can put keys here to better name them for a user
			{key: 'ugm_id', label: 'UserGroup Membership ID'},
			{key: 'uid', label: 'Unique User ID (uID)'},
			{key: 'ug_id', label: 'UserGroup ID'}
			
				//Zapier will format keys by capitalising them and getting rid of underscores etc without this
		],

	},
};


   