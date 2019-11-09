/*
* Backend Get Authorization Token Test
* Usage: node bc-get-auth-token.js [password]
* UsageAsModule: require('./bc-get-auth-token').getAuth().then(console.log)
* UsageAsModuleAwait: await require('./bc-get-auth-token').getAuth()
*/
const request = require('request-promise');

const getAuth = function () {
	return new Promise( function (res, rej) {
		const password = process.env.PASSWORD;
		const url = 'https://api.uat.pe.researchnow.com/auth/v1/token/password';
		const options = { method: 'POST',
			url: url,
			headers: { 'content-type': 'application/json' },
			body: {
				clientId: 'api',
				password: password,
				username: 'crowd_emotion_sample_api' },
			json: true };
		request(options).then(function(r){
			res(r.accessToken);
		});
	} );
}

module.exports = { getAuth: getAuth }

if (require.main === module) getAuth().then(console.log);
