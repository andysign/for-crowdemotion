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
	}

	render() {
		if (this.state.authToken) {
			return <><span>LoggedIn</span></>
		} else {
			return <><Login /></>
		}
	}
}

export default App;
