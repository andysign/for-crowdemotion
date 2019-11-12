import React from 'react';

class ProjectForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
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
