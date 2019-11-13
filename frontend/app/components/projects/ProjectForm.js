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
				"project.lineItems[0].quotaPlan.filters[0].options",
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
		let data = { title: this.state.title }
		let line = this.state.editableLineNum;
		data.lineItems = [{}];
		data.lineItems[line].extLineItemId = this.state.extLineItemId;
		data.lineItems[line].countryISOCode = this.state.countryISOCode;
		data.lineItems[line].languageISOCode = this.state.languageISOCode;
		data.lineItems[line].quotaPlan = {}
		data.lineItems[line].quotaPlan.filters = [{}];
		data.lineItems[line].quotaPlan.filters[0].attributeId = "11";
		data.lineItems[line].quotaPlan.filters[0].operator = "INCLUDE";
		data.lineItems[line].quotaPlan.filters[0].options =
			this.state.quotaPlanFilterOptions.split("+");
		data.lineItems[line].targets = [{}];
		data.lineItems[line].targets[0].count = 1*this.state.targetsCount;
		data.lineItems[line].targets[0].type = "COMPLETE";
		console.log(data);
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
					<label>Title:</label>
					<input name="title" className="form-control"
						defaultValue={this.state.title}
						onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label>CountryISOCode <small>(for line 0)</small>:</label>
					<input name="countryISOCode" className="form-control"
						defaultValue={this.state.countryISOCode}
						onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label>LanguageISOCode <small>(for line 0)</small>:</label>
					<input name="languageISOCode" className="form-control"
						defaultValue={this.state.languageISOCode}
						onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label>Quota Demography <small>(for line 0)</small>:</label>
					<br />
					<input name="quotaPlanFilterOptions" type="radio"
						defaultValue={'1'}
						onChange={this.handleChange}
					/> Male<br />
					<input name="quotaPlanFilterOptions" type="radio"
						defaultValue={'2'}
						onChange={this.handleChange}
					/> Female<br />
					<input name="quotaPlanFilterOptions" type="radio"
						defaultValue={'1+2'}
						onChange={this.handleChange}
					/> Both Male and Female<br />
				</div>
				<div className="form-group">
					<label>TargetsCount <small>(for line 0)</small>:</label>
					<input name="targetsCount" className="form-control"
						defaultValue={this.state.targetsCount}
						onChange={this.handleChange}
					/>
				</div>
				<button type="submit" className="btn btn-outline-dark">
					<b>Save</b>
				</button>
				{this.props.lastUpdate && <h2><br />DONE</h2>}
				{this.state.error && <h2>Error</h2>}
			</form>
		);
	}
}

export default ProjectForm;
