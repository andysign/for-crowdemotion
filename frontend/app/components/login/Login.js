import React from 'react';
import BackendSdk from './../../utils/sdk/Sdk';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isSucessful: false,
			data: {},
			username: '',
			password: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event, data) {
		event.preventDefault();
		const sdk = new BackendSdk();
		sdk.login(this.state.username, this.state.password, (response)=>{
			if (response.isSucessful) {
				this.setState(response);
				console.log(response.data.AuthorizationBasic);
			}
			else {
				this.setState(response);
			}
		} );
	}

	render() {
		return (
			<>
				<form onSubmit={this.handleSubmit}>
					<input name="username" onChange={this.handleChange} />
					<input name="password" onChange={this.handleChange} />
					<br /><button type="submit"><b>Submit</b></button>
				</form>
			</>
		);
	}
}

export default LoginView;
