/*
* Backend Get Authorization Token Test
* Usage: node bc-get-auth-token.js [password]
* UsageAsModule: require('./bc-get-auth-token')
*/
const request = require('request-promise');

const p = process;
const password=require.main===module?(p.argv[2]||p.env.PASSWORD):p.env.PASSWORD;
const url = 'https://api.uat.pe.researchnow.com/auth/v1/token/password';

const options = { method: 'POST',
	url: url,
	headers: { 'content-type': 'application/json' },
	body: {
		clientId: 'api',
		password: password,
		username: 'crowd_emotion_sample_api' },
	json: true };

const call = request(options);

if (require.main !== module) { module.exports = call; }

if (require.main === module) {
	call.then( function(r) { console.log(r.accessToken); } )
		.catch( function() { console.error('Call failed...'); } );
}
