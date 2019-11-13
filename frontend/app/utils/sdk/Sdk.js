import SettingsService from './SettingsService.js';

class BackendSdk {
	constructor(authToken) {
		this.token = authToken;
	}

	static getOrigin() {
		return SettingsService.getBackendHost();
	}

	getAuthHeader() {
		return {
			'Authorization': 'Basic ' + this.token,
			'Content-Type': 'application/json'
		}
	}

	makeRequest(path, method, callback) {
		// this is the method that makes calls
		let content = {
			method: method,
			headers: this.getAuthHeader()
		}
		BackendSdk.fetch(path, content, callback);
	}

	makeRequestWithPayload(path, method, payload, callback) {
		// this is the method that makes calls with payload
		let content = {
			method: method,
			headers: this.getAuthHeader(),
			body: JSON.stringify(payload)
		}
		BackendSdk.fetch(path, content, callback);
	}

	static getSuccessfullState(result) {
		// this is passed to the callback when an API call is sucessfull
		return {
			isSucessful: true,
			error: null,
			data: result
		}
	}

	static getErrorState(status, message){
		// this is passed to the callback when the API call has an error
		return {
			isSucessful: false,
			error: {message: status + ' ' + message}
		}
	}

	static fetch(path, content, cb) {
		fetch(path, content).then(response => {

			if (!response.ok) {
				cb(BackendSdk.getErrorState(response.status,response.statusText)
				);
			} else {
				try {
					let result = response.json();
					result.then( (result) => {
						 cb(BackendSdk.getSuccessfullState(result));
					} );
				}
				catch(error) {
					cb(BackendSdk.getErrorState('', error));
				}
			}

		}).catch((error) => {
			cb(BackendSdk.getErrorState('', error.message));
		});
	}

	login(username, password, callback) {
		const path = BackendSdk.getOrigin() + '/login';
		const content = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ username: username, password: password })
		}
		BackendSdk.fetch(path, content, callback);
	}

	getAllProjects(callback) {
		const path = BackendSdk.getOrigin() + '/get-all-projects';
		this.makeRequest(path, "GET", callback);
	}

	getProject(extProjectId, callback) {
		const path = BackendSdk.getOrigin()+'/get-project/'+extProjectId;
		this.makeRequest(path, "GET", callback);
	}

	updateProject(extProjectId, data, callback) {
		const path = BackendSdk.getOrigin()+'/update-project/'+extProjectId;
		this.makeRequestWithPayload(path, "POST", data, callback);
	}

}

export default BackendSdk;
