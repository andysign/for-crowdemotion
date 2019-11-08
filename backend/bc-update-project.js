const request = require("request-promise");
// var request = require("request");
const getAuthToken = require('./bc-get-auth-token');

const auth = process.argv[2] ? process.argv[2] : '';
const url = 'https://api.uat.pe.researchnow.com/sample/v1/projects/project001';

var options = { method: 'POST',
	url: url,
	headers:
		{ authorization: '',//'Bearer '+auth,
			'content-type': 'application/json' },
	body: { title: 'Automotive Study Edit One' },
	json: true };

getAuthToken.then(function(a){
	options.headers.authorization = 'Bearer '+a.accessToken;
	const call = request(options);
	if (require.main !== module) { module.exports = call; }
	call.then( function(r) {
		console.log(r);
	} ).catch( function() { console.error('Call failed...'); } );
}).catch( function() { console.error('Error'); });
