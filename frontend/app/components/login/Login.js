import React from 'react';
import Footer from './../common/Footer';
import Navbar from './../common/Navbar';
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
				this.props.onLoginHandler(response.data.AuthorizationBasic);
			}
			else {
				this.setState(response);
			}
		} );
	}

	render() {
		return (
			<>
				<Navbar />
				<div className="bg-light py-3 row">
					<div className="container">
						<div className="p-5 col-md-12">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label>Username </label>
									<input name="username"
										className="form-control"
										onChange={this.handleChange}
										onClick={this.handleChange}
									/>
								</div>
								<div className="form-group">
									<label>Password </label>
									<input name="password"
										className="form-control"
										onChange={this.handleChange}
										onClick={this.handleChange}
										type="password"
									/>
								</div>
								<br />
								<button type="submit"
									className="btn btn-outline-dark btn-block"
								>
									<b>Submit</b>
								</button>
							</form>
						</div>
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default LoginView;
