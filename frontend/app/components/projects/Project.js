import React from 'react';

class Project extends React.Component {
	constructor(props) {
		super(props);
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
						<div>
							Form
						</div>
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default Project;
