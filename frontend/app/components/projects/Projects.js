import React from 'react';
import ProjectsContainer from './ProjectsContainer';
import LoadingSpinner from './../common/LoadingSpinner'
import BackendSdk from './../../utils/sdk/Sdk';

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isSucessful: false,
			data:{}
		}
		this.sdk = new BackendSdk(this.props.authToken);
	}

	componentDidMount() {
		this.getAllPrjsData();
	}

	getAllPrjsData() {
		this.sdk.getAllProjects(response => {this.setState(response);});
	}

	render() {

		if (this.state.error) {
			return <h1> TODO: add error component </h1>
		}

		if (this.state.isSucessful) {
			return (
				<>
				<ProjectsContainer projects={this.state.data.data}
					authToken={this.props.authToken}
					handleLogout={this.props.handleLogout}
				/>
				</>
			);
		}

		return <LoadingSpinner />

	}
}

export default Projects;
