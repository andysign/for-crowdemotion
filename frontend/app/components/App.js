import React from 'react';
import fontstyle from './static/fa/FontAwesome.css';
import styles from './static/App.css';
import Login from './login/Login';
import Projects from './projects/Projects.js'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authToken: null
		}
		this.onLoginHandler = this.onLoginHandler.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	onLoginHandler (token) {
		this.setState({
			authToken: token
		});
	}

	handleLogout() {
		this.setState({
			authToken: null
		});
	}

	render() {
		if (this.state.authToken) {
			return <Projects authToken={this.state.authToken}
							 handleLogout={this.handleLogout} />
		} else {
			return <Login onLoginHandler={this.onLoginHandler} />
		}
	}
}

export default App;
