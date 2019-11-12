import React from 'react';


class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<div className="py-3">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<p className="mb-0">&copy;
									Created by Andy B. All rights reserved</p>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-dark py-3">
					<div className="container">
						<div className="row d-flex justify-content-between">
							<div className="col-lg-4 col-md-6">
								<p className="text-secondary mb-0">&nbsp;</p>
							</div>
							<div className="col-lg-4 col-md-6">
								<p className="text-secondary mb-0">&nbsp;</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
