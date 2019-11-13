import React from 'react';
import BackendSdk from './../../utils/sdk/Sdk';

class ProjectForm extends React.Component {
	constructor(props) {
		super(props);
		let project = this.props.project;
		this.state = {
			error: null,
			extProjectId: project.extProjectId,
			title: project.title,
			editableLineNum: 0,
			extLineItemId: project.lineItems[0].extLineItemId,
			countryISOCode: project.lineItems[0].countryISOCode,
			languageISOCode: project.lineItems[0].languageISOCode,
			quotaPlanFilterOptions:
				project.lineItems[0].quotaPlan.filters[0].options,
			targetsCount: project.lineItems[0].targets[0].count
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.sdk = new BackendSdk(this.props.authToken);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		let data = {title: this.state.title}
		this.sdk.updateProject(this.state.extProjectId, data, (response)=>{
			if (response.isSucessful) {
				this.props.handleLastUpdate();
			} else {
				this.setState({error: response.error})
			}
		});
	}

	render () {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label>Title</label>
					<input name="title"
						className="form-control"
						onChange={this.handleChange}
						defaultValue={this.state.title}
					/>
				</div>
				<button type="submit"
					className="btn btn-outline-dark"
				>
					<b>Save</b>
				</button>
				{this.props.lastUpdate && <h2><br />DONE</h2>}
				{this.state.error && <h2>Error</h2>}
			</form>
		);
	}
}

export default ProjectForm;
