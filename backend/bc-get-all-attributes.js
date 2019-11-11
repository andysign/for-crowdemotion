/*
* Backend Get All Demographic Attributes
* Usage: node bc-get-all-attributes.js
* UsageAsModule: require('./bc-get-all-attributes').getAllAttributes().then()
* UsageWithAwait: await require('./bc-get-all-attributes').getAllAttributes()
*/
const request = require("request-promise"); // var request = require("request");
const getAuthToken = require('./bc-get-auth-token');

const getAllAttributes = function (countryCode, languageCode) {
	return new Promise( function (res, rej) {
		getAuthToken.getAuth().then(function(auth){
			var defCC = 'US';
			var defLC = 'en';
			var domain = 'https://api.uat.pe.researchnow.com/';
			var path = 'sample/v1/attributes/';
			countryCode = countryCode === undefined ? defCC : countryCode;
			languageCode = languageCode === undefined ? defLC : languageCode;
			var url = domain + path + countryCode + '/' + languageCode;
			var options = { method: 'GET',
				url: url,
				qs: { offset: '0', limit: '10' },
				headers: { 	authorization: 'Bearer '+auth,
							'content-type': 'application/json' } };
			request(options).then(function(r){
				res(r);
			});
		});
	} );
}

module.exports = { getAllAttributes: getAllAttributes }

if (require.main === module) getAllAttributes().then(console.log);
