var caps = require('string-capitalize-name');
module.exports = function(response) {
	if("forename" in response[0]){
		response[0]["forename"] = caps(response[0]["forename"]);
	} if("surname" in response[0]){
		response[0]["surname"] = caps(response[0]["surname"]);
	} 
	return response;
}