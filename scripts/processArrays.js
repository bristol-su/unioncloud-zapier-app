var caps = require('./string-capitalize-name');
module.exports = function(response) { //Return this
	if("forename" in response[0]){ //If the key is forename, capitalise it
		response[0]["forename"] = caps(response[0]["forename"],{ignoreLessThanLength: 3});
	} if("surname" in response[0]){ //if the key is surname, capitalise it
		response[0]["surname"] = caps(response[0]["surname"],{ignoreLessThanLength: 3});
	} 
	return response;
}