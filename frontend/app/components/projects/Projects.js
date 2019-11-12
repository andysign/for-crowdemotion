import React from 'react';
import BackendSdk from './../../utils/sdk/Sdk';
import ProjectsContainer from './ProjectsContainer';

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
		this.getAllPrjData();
	}

	getAllPrjData() {
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
				/>
				</>
			);
		}

		return <>Loding...</>

	}
}

export default Projects;
