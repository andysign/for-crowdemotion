/*
* Backend Update a Given Projects With Given Data
* Usage: node bc-update-project.js 'project001' '{"title":"Text"}'
* UsageAsModule: require('./bc-update-project')
*/
const request = require("request-promise");
// var request = require("request");
const getAuthToken = require('./bc-get-auth-token');

const prj = process.argv[2] ? process.argv[2] : 'project001';
const body= process.argv[3] ? process.argv[3] : '{"title":"Text"}';
const path= 'sample/v1/projects/';
const domain = 'https://api.uat.pe.researchnow.com/';
// const url = 'https://api.uat.pe.researchnow.com/sample/v1/projects/project001';
const url = domain + path + prj;

var options = { method: 'POST',
	url: url,
	headers:
		{ authorization: '',//'Bearer '+auth,
			'content-type': 'application/json' },
	body: JSON.parse(body),
	json: true };

getAuthToken.then(function(a){
	options.headers.authorization = 'Bearer '+a.accessToken;
	const call = request(options);
	if (require.main !== module) { module.exports = call; }
	call.then( function(r) {
		console.log(r);
	} ).catch( function() { console.error('Call failed...'); } );
}).catch( function() { console.error('Error'); });
