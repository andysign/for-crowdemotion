import React from 'react';


class ProjectsContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedProject: null
		}
	}

	handleAllSelection() {
		this.setState({selectedProject: null});
	}

	handleProjectSelection(id) {
		let project = this.props.projects.find(e=>e.extProjectId==id);
		this.setState({selectedProject: project});
	}

	getSideBar() {
		let { projects } = this.props;
		if (projects.length) {
			return (
				<div className="col-sm-2 col-12">
					<div className="nav nav-pills flex-column pb-3">
						<ul>
						<>
							<>
								<li>
									<div>
										<a
											href="#"
											onClick={()=>(
												this.handleAllSelection()
											)}
										>
											All Projects
										</a>
									</div>
									<small><i>(all)</i></small>
								</li>
							</>
							{projects.map( (project,i)=>{ return (
								<li key={i}>
									<div>
										<a
											href="#"
											onClick={()=>(
												this.handleProjectSelection(
													project.extProjectId
												)
											)}
										>
											Project #{i+1}:
										</a>
										<span> {project.title}</span>
									</div>
									<small>
										<i>({project.extProjectId})</i>
									</small>
								</li>
							); } )}
						</>
						</ul>
					</div>
				</div>
			);
		} else {
			return (
				<div>NOPROJECTS</div>
			);
		}
	}

	getContentPage() {

		if (this.props.projects.length == 0) {
			return <div>NODATA</div>
		}

		if (this.state.selectedProject == null) {
			return (
				<div className="col-sm-10 col-12">
					<div className="tab-content">
						<div id="tab-0"
							className="tab-pane fade active show"
							role="tabpanel"
						>
							<h1>Overall Stats Page</h1>
							<h2>
								Number Of Projects:
								<span> {this.props.projects.length}</span>
							</h2>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="col-sm-10 col-12">
				<h1>{this.state.selectedProject.title}</h1>
				<h2>Project</h2>
			</div>
		);

	}

	render() {
		return(
			<div>
				{/*<Navbar />*/}
				<div className='py-2'>
					<div className='container'>
						<div className='row'>
							{this.getSideBar()}
							{this.getContentPage()}
						</div>
					</div>
				</div>
				{/*<Footer />*/}
			</div>
		);
	}
}

export default ProjectsContainer;
