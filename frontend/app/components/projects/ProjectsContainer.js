import React from 'react';
import Navbar from './../common/Navbar';
import ProjectsNoDataPage from './ProjectsNoDataPage';
import ProjectsStatsPage from './ProjectsStatsPage';
import Project from './Project';
import Footer from './../common/Footer.js';


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
						<ul className="nav nav-pills flex-column">
						<>
							<>
								<li className="nav-item">
									<div>
										<a
											href="#"
											className="nav-link"
											data-toggle="pill"
											onClick={()=>(
												this.handleAllSelection()
											)}
										>
											All Projects
											<br />
											<small>
												<i>(all)</i>
											</small>
										</a>
									</div>

								</li>
							</>
							{projects.map( (project,i)=>{ return (
								<li className="nav-item" key={i}>
									<div>
										<a
											href="#"
											className="nav-link"
											data-toggle="pill"
											onClick={()=>(
												this.handleProjectSelection(
													project.extProjectId
												)
											)}
										>
											Project #{i+1}:
											<br />
											<small>
												<i>({project.extProjectId})</i>
											</small>
										</a>
									</div>
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
			return <ProjectsNoDataPage />
		}

		if (this.state.selectedProject == null) {
			return <ProjectsStatsPage len={this.props.projects.length} />
		}

		return (
			<Project
				selectedProject={this.state.selectedProject}
				authToken={this.props.authToken}
				handleLogout={this.props.handleLogout}
			/>
		);

	}

	render() {
		return(
			<div>
				<Navbar handleLogout={this.props.handleLogout} />
				<div className='py-2'>
					<div className='container'>
						<div className='row'>
							{this.getSideBar()}
							{this.getContentPage()}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default ProjectsContainer;
