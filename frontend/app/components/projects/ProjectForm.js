import React from 'react';

class ProjectForm extends React.Component {
	constructor(props) {
		super(props);
		let project = this.props.project;
		this.state = {
			title: project.title,
			editableLineNum: 0,
			extLineItemId: project.lineItems[0].extLineItemId,
			countryISOCode: project.lineItems[0].countryISOCode,
			languageISOCode: project.lineItems[0].languageISOCode,
			quotaPlanFilterOptions:
				project.lineItems[0].quotaPlan.filters[0].options,
			targetsCount: project.lineItems[0].targets[0].count
		}
		this.handleLastUpdateSubmit = this.handleLastUpdateSubmit.bind(this);
	}

	handleLastUpdateSubmit(event) {
		event.preventDefault();
		this.props.handleLastUpdate();
	}

	render () {
		return (
			<>
			<form onSubmit={this.handleLastUpdateSubmit}>
				<div className="form-group">
					<label>Title</label>
					<input name="title"
						className="form-control"
						defaultValue={1}
					/>
				</div>
			</form>
			{
				this.props.lastUpdate&&
				<h2>DONE</h2>
			}
			</>
		);
	}
}

export default ProjectForm;
