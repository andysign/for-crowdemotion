/*
* Backend Get A Project Based on extProjectId
* Usage: node bc-get-all-countries.js
* UsageAsModule:require('./bc-get-project').getProject('project001').then()
* UsageAsModuleAwait: await require('./bc-get-project').getProject()
*/
const request = require("request-promise"); // var request = require("request");
const getAuthToken = require('./bc-get-auth-token');

const getProject = function (extProjectId) {
	return new Promise( function (res, rej) {
		getAuthToken.getAuth().then(function(auth){
			var def = 'project001';
			extProjectId = extProjectId === undefined ? def : extProjectId;
			var domain = 'https://api.uat.pe.researchnow.com';
			var path = '/sample/v1/projects/' + extProjectId;
			var url = domain + path;
			var options = { method: 'GET',
				url: url,
				headers:
					{	authorization: 'Bearer '+auth+'',
						'content-type': 'application/json' } };
			request(options).then(function(r){
				res(r);
			});
		});
	} );
}

module.exports = { getProject: getProject }

if (require.main === module) getProject().then(console.log);
