/*
* Backend Get All Projects If Any Else Empty Array
* Usage: node bc-get-all-projects.js
* UsageAsModule: require('./bc-get-all-projects').getAllProjects().then()
* UsageAsModuleAwait: await require('./bc-get-all-projects').getAllProjects()
*/
const request = require("request-promise"); // var request = require("request");
const getAuthToken = require('./bc-get-auth-token');

const getAllProjects = function () {
	return new Promise( function (res, rej) {
		getAuthToken.getAuth().then(function(auth){
			const url = 'https://api.uat.pe.researchnow.com/sample/v1/projects';
			const options = { method: 'GET',
				url: url,
				qs: { limit: '100' },
				headers:
					{ authorization: 'Bearer '+auth+'',
					'content-type': 'application/json' } };
			request(options).then(function(r){
				res(r);
			});
		});
	} );
}

module.exports = { getAllProjects: getAllProjects }

if (require.main === module) getAllProjects().then(console.log);
