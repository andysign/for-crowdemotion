// var request = require("request");
const request = require("request-promise");

const prc = process;
const auth = prc.argv[2] ? prc.argv[2] : (prc.env.AUTH?prc.env.AUTH:'');
const url = 'https://api.uat.pe.researchnow.com/sample/v1/projects';

const options = { method: 'GET',
	url: url,
	qs: { limit: '10' },
	headers:
		{ authorization: 'Bearer '+auth,
		'content-type': 'application/json' } };

const call = request(options);

if (require.main !== module) module.exports = call;

call.then( function(r) {
	console.log(r);
} ).catch( function() { console.error('Call failed...'); } );
