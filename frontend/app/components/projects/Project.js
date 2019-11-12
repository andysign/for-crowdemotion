import React from 'react';
import LoadingSpinner from './../common/LoadingSpinner';
// import ProjectForm from './ProjectForm.js';
import BackendSdk from './../../utils/sdk/Sdk';

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isSucessful: false,
			data:{},
			extProjectId: this.props.selectedProject.extProjectId,
		}
		this.sdk = new BackendSdk(this.props.authToken);
	}

	componentDidMount() {
		this.getPrjData(this.state.extProjectId);
	}


	getPrjData(id) {
		this.sdk.getProject(id, response => {this.setState(response);});
	}

	render() {
		const prj = this.props.selectedProject;
		return (
			<>
			<div className="col-sm-10 col-12">
				<div className="tab-content">
					<div id="tab-0"
						className="tab-pane fade active show"
						role="tabpanel"
					>
						<h1>Project Info:</h1>
						<h2>{prj.extProjectId}</h2>
						<h5><b>CreatedAt: </b>{prj.createdAt}</h5>
						<h5><b>JobNumber: </b>{prj.jobNumber}</h5>
						<h5><b>State: </b>{prj.state}</h5>
						<h5><b>SLastUpdatedAt: </b>{prj.stateLastUpdatedAt}</h5>
						<h5><b>Title: </b>{prj.title}</h5>
						<h5><b>UpdatedAt: </b>{prj.updatedAt}</h5>
						<hr />
						<pre>
							{JSON.stringify(this.state.data.data)}
						</pre>
						{/*
						<ProjectForm
							project={this.state.data.data}
							authToken={this.props.authToken}
						/>
						*/}
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default Project;
