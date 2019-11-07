/*
* Backend Get Authorization Token Test
* Usage: node bc-get-auth-token.js [password]
* UsageAsModule: require('./bc-get-auth-token')
*/
const request = require('request-promise');

const prc = process;
const password = prc.argv[2]?prc.argv[2]:(prc.env.PASSWORD?prc.env.PASSWORD:'');
const url = 'https://api.uat.pe.researchnow.com/auth/v1/token/password';

const options = { method: 'POST',
	uri: url,
	headers: { 'content-type': 'application/json' },
	body: {
		clientId: 'api',
		password: password,
		username: 'crowd_emotion_sample_api' },
	json: true };

const call = request(options);

if (require.main !== module) module.exports = call;

call.then( function(r) {
	console.log(r.accessToken);
} ).catch( function() { console.error('Call failed...'); } );
