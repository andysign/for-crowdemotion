/*
* Backend Get All Projects If Any Else Empty Array
* Usage: node bc-get-all-projects.js auth
* UsageAsModule: require('./bc-get-all-projects')
*/
const request = require("request-promise"); // var request = require("request");
const getAuthToken = require('./bc-get-auth-token');

const prc = process;
const auth = prc.argv[2] ? prc.argv[2] : '';
const url = 'https://api.uat.pe.researchnow.com/sample/v1/projects';

const options = { method: 'GET',
	url: url,
	qs: { limit: '10' },
	headers:
		{ authorization: '', // 'Bearer '+auth
		'content-type': 'application/json' } };

if (auth) {
	options.headers.authorization = 'Bearer '+auth;
	const call = request(options);
	call.then( function(r) {
		console.log(r);
	} ).catch( function() { console.error('Call failed...'); } );
} else {
	getAuthToken.then(function(a){
		options.headers.authorization = 'Bearer '+a.accessToken;
		const call = request(options);
		if (require.main !== module) { module.exports = call; }
		call.then( function(r) {
			console.log(r);
		} ).catch( function() { console.error('Call failed...'); } );
	}).catch( function() { console.error('Error'); });
}
