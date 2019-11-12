import React from 'react';

class LoadingSpinner extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div
				style={{width:'100%',height:this.props.height}}
				className="d-flex justify-content-center align-items-center"
			>
				<h2 className="card-title text-center">
					<i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
					<br />
					Loading
				</h2>
			</div>
		)
	}
}

LoadingSpinner.defaultProps = {
	height: window.innerHeight + 'px'
}

export default LoadingSpinner;
