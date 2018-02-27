var caps = require('./../scripts/processArrays');
const fetchNames = (z, bundle) => {

  const request = {
    url: 'https://'+bundle.authData.domain+'/api/user_groups?mode=standard'
  };
  
  return z.request(request)
    .then((response) => {
	if (response.status >= 300) { //Something went wrong!
		throw new Error("Searching for user failed.");
	  }
      var namesArray = JSON.parse(response.content).data;
      if (namesArray == null){ //No usergroups have been created
    	  throw new Error("Could not find any User Groups.");
      }
      returningArray = [];
      namesArray.forEach(function(ugdata){//iterate over the passed back data. We only want to pass back the id and
    	  //the name for the new usergroup dynamic dropdown
    	  items = {
    			  id: ugdata.ug_id,
    			  name: ugdata.ug_name
    	  };
    	  returningArray.push(items); //Push each iten to returningArray
      });
      return caps(returningArray); //Sort out correct capitalisation
    });
};

module.exports = {
  key: 'ugnames',
  noun: 'UserGroup Names',
  display: {
    label: 'List of UserGroup Names',
    description: 'This is a hidden trigger, and is used in a Dynamic Dropdown within this app',
    hidden: true,
  },

  operation: {		
    // since this is a "hidden" trigger, there aren't any inputFields needed
    perform: fetchNames,
  },

};