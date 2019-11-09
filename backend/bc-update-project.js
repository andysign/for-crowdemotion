/*
* Backend Update a Given Projects With Given Data
* Usage: node bc-update-project.js 'project001' '{"title":"Text"}'
* UsageAsModule:require('./bc-update-project').updateProject().then(console.log)
* UsageAsModuleAwait: await require('./bc-update-project').updateProject()
*/
const request = require("request-promise"); // var request = require("request");
const getAuthToken = require('./bc-get-auth-token');

const updateProject = function (prj, body) {
	prj = prj === undefined ? 'project001' : prj;
	body = body === undefined ? '{"title":"Text"}' : body;
	return new Promise( function (res, rej) {
		getAuthToken.getAuth().then(function(auth){
			const path= 'sample/v1/projects/';
			const domain = 'https://api.uat.pe.researchnow.com/';
			const url = domain + path + prj;
			const options = { method: 'POST',
							url: url,
							headers:{ authorization: 'Bearer '+auth,
									'content-type': 'application/json' },
							body: JSON.parse(body),
							json: true }
			request(options).then(function(r){
				res(r);
			});
		});
	} );
}

module.exports = { updateProject: updateProject }

const prj = process.argv[2] ? process.argv[2] : 'project001';
const body= process.argv[3] ? process.argv[3] : '{"title":"Text"}';
if (require.main === module) updateProject(prj, body).then(console.log);
