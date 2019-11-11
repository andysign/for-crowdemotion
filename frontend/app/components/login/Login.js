import React from 'react';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isSucessful: false,
			data: {}
		};
	}
	render() {
		return (<>Login</>);
	}
}

export default LoginView;
