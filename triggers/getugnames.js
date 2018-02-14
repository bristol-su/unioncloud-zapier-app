// fetches a list of records from the endpoint
const fetchNames = (z, bundle) => {

  const request = {
    url: 'https://bristol.unioncloud.org/api/user_groups?mode=basic'
  };
  
  return z.request(request)
    .then((response) => {
    	console.log(response);
      var namesArray = JSON.parse(response.content).data;
      returningArray = [];
      namesArray.forEach(function(ugdata){
    	  items = {
    			  id: ugdata.ug_id,
    			  name: ugdata.ug_name
    	  };
    	  returningArray.push(items);
      });
      console.log(returningArray);
      return returningArray;
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
    perform: fetchNames//,
    // the folowing is a "hint" to the Zap Editor that this trigger returns data "in pages", and
    //   that the UI should display an option to "load next page" to the human.
    //canPaginate: true
  },

};