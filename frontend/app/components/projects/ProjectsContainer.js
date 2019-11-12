import React from 'react';


class ProjectsContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedProject: null
		}
	}

	getSideBar() {
		let { projects } = this.props;
		if (projects.length) {
			return (
				<ul>
				<>
					<>
						<li>
							<div><b>All Projects</b></div>
							<small><i>(all)</i></small>
						</li>
					</>
					{projects.map( (prj,i)=>{ return (
						<li key={i}>
							<div>
								<b>Project #{i+1}:</b>
								<span> {prj.title}</span>
							</div>
							<small>
								<i>({prj.extProjectId})</i>
							</small>
						</li>
					); } )}
				</>
				</ul>
			);
		} else {
			return (
				<div>NOPROJECTS</div>
			);
		}
	}

	render() {
		return(
			<div>
				{/*<Navbar />*/}
				<div className='py-2'>
					<div className='container'>
						<div className='row'>
							{this.getSideBar()}
						</div>
					</div>
				</div>
				{/*<Footer />*/}
			</div>
		);
	}
}

export default ProjectsContainer;
