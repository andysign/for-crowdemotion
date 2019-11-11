import SettingsService from './SettingsService.js';

class BackendSdk {
	constructor(authToken) {
		this.token = authToken;
	}

	static getBackendHost() {
		return SettingsService.getBackendHost();
	}

	getAuthHeader() {
		return {
			'Authorization': 'Basic ' + this.token,
			'Content-Type': 'application/json'
		}
	}

	static getSuccessfullState(result) {
		// this is passed to the callback when an API call is sucessfull
		return {
			isSucessful: true,
			error: null,
			data: result
		}
	}

	static getErrorState(state, message){
		// this is passed to the callback when the API call has an error
		return {
			isSucessful: false,
			error: {message: status + ' ' + message}
		}
	}

	static fetch(path, content, cb) {
		fetch(path, content)
		.then(response => {

			if (!response.ok) {
				cb(BackendSdk.getErrorState(response.status,response.statusText)
				);
			}

			try {
				let result = response.json();
				result.then( (result) => {
					 cb(BackendSdk.getSuccessfullState(result));
				} );
			}
			catch(error) {
				cb(BackendSdk.getErrorState('', error.message));
			}

		})
		.catch((error) => {
			cb(BackendSdk.getErrorState('', error.message));
		});
	}

	login(username, password, callback) {
		const origin = BackendSdk.getBackendHost();
		const path = origin + '/login';
		const content = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username: username,
				password: password
			})
		}
		BackendSdk.fetch(path, content, callback);
	}
}

export default BackendSdk;
