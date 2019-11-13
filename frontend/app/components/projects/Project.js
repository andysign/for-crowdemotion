import React from 'react';
import LoadingSpinner from './../common/LoadingSpinner';
import ProjectForm from './ProjectForm';
import BackendSdk from './../../utils/sdk/Sdk';

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isSucessful: false,
			data:{},
			extProjectId: this.props.selectedProject.extProjectId,
			lastUpdate: null
		}
		this.sdk = new BackendSdk(this.props.authToken);
		this.handleLastUpdate = this.handleLastUpdate.bind(this);
	}

	componentDidMount() {
		this.getPrjData(this.state.extProjectId);
	}

	handleLastUpdate() {
		this.setState({lastUpdate: 1*new Date()}, ()=>{
			let id = this.state.extProjectId;
			this.getPrjData(id);
		});
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
						{(()=>{

							if (this.state.error) {
								return (<h1>TODO:Add error component</h1>);
							}

							if (this.state.isSucessful) {
								return (
									<ProjectForm
										project={this.state.data.data}
										authToken={this.props.authToken}
										handleLastUpdate={this.handleLastUpdate}
										lastUpdate={this.state.lastUpdate}
									/>
								)
							}

							return (<>Loading...</>)

						})()}
						<hr />
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default Project;
