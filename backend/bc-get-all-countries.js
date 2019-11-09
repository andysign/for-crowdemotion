/*
* Backend Get All Countries
* Usage: node bc-get-all-countries.js
* UsageAsModule:require('./bc-get-all-countries').getAllCountries().then()
* UsageAsModuleAwait: await require('./bc-get-all-countries').getAllCountries()
*/
const request = require("request-promise"); // var request = require("request");
const getAuthToken = require('./bc-get-auth-token');

const getAllCountries = function (prj, body) {
	return new Promise( function (res, rej) {
		getAuthToken.getAuth().then(function(auth){
			const url='https://api.uat.pe.researchnow.com/sample/v1/countries';
			const options = { method: 'GET',
				url: url,
				qs: { limit: '200' },
				headers:
					{	authorization: 'Bearer '+auth+'',
						'content-type': 'application/json' } };
			request(options).then(function(r){
				res(r);
			});
		});
	} );
}

module.exports = { getAllCountries: getAllCountries }

if (require.main === module) getAllCountries().then(console.log);
