import React from 'react';
import Login from './login/Login';
import styles from './static/App.css';
import fa from './static/fa/FontAwesome.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authToken: null
		}
		this.onLoginHandler = this.onLoginHandler.bind(this);
	}

	onLoginHandler (token) {
		this.setState({
			authToken: token
		});
	}

	render() {
		if (this.state.authToken) {
			return <><span>LoggedIn</span></>
		} else {
			return <Login onLoginHandler={this.onLoginHandler} />
		}
	}
}

export default App;
