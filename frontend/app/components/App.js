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
	}

	onLoginHandler (token) {
		this.setState({
			authToken: token
		});
	}

	render() {
		if (this.state.authToken) {
			return <Projects authToken={this.state.authToken} />
		} else {
			return <Login onLoginHandler={this.onLoginHandler} />
		}
	}
}

export default App;
