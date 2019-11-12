import React from 'react';

const ProjectsStatsPage = (props) => {
	return (
		<>
		<div className="col-sm-10 col-12">
			<div className="tab-content">
				<div id="tab-0"
					className="tab-pane fade active show"
					role="tabpanel"
				>
					<h1>Stats Page</h1>
					<h2>
						Number Of Projects:
						<span> {props.len}</span>
					</h2>
				</div>
			</div>
		</div>
		</>
	);
}

export default ProjectsStatsPage;
