var caps = require('./../scripts/processArrays'); //Capitalise the names correctly.
module.exports = {
  key: 'searchuser',
  noun: 'Users',
  display: {
    label: 'Search for a User.',
    description: 'Search for a User.'
  },

	operation: {
        inputFields: [
          {
            key: 'searchData',
            dict: true,
            required: true,
            label: 'Search Parameters',
            helpText: 'The search parameter (on the left) can be anything from id, forename, surname, dob, email, library_card or department.',
            //choices: {id: '', forename: '', surname: '', dob: '', email: '', library_card: '', department: ''}
          },
        ],
         perform: (z, bundle) => {
        	 var allowedIDs = ['forename', 'surname', 'dob', 'email', 'library_card', 'department', 'id'];
        	 var searchData = bundle.inputData.searchData;
        	 var processedKeys = [];
        	 //Check the input keys are all valid, and decapitalise each one
        	 for (var key in searchData) {
        		    // check if the property/key is defined in the object itself, not in parent
        		    if (searchData.hasOwnProperty(key)) {
        		    	if(searchData[key] == "" || searchData[key] == undefined){
        		    		delete searchData[key];
        		    		continue; //If it's blank, delete it
        		    	}
        		    	if(key in processedKeys){
        		    		throw new Error("Please ensure you only have one "+key+" search field.")
        		    	}
        		    	//If the key isn't in the array
        		    	if(allowedIDs.indexOf(key) == -1){
            		        if(allowedIDs.indexOf(key.toLowerCase()) > -1){ //is it if it's in lower case?
        		        		searchData[key.toLowerCase()] = searchData[key];
            		        	delete searchData[key]; //Make the key lower case
            		        	processedKeys.push(key);
            		        } else {
            		        	throw new Error(key+" is not a searchable column.");
            		        }
        		    	} else {
        		    		processedKeys.push(key);
        		    	}
        		    }
        		}
			  const options = { //set the body to have queries given
				  data: searchData
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


   