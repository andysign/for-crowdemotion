import React from 'react';
// import NavbarItem from './NavbarItem';
// import NavbarBrand from './NavbarBrand';
// import NavbarCollapseContainer from './NavbarCollapseContainer';
// import logo from '../../resources/logo.svg';


class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
	}

	handleLogoutClick() {
		this.props.handleLogout();
	}

	render() { return (

		<nav className="navbar navbar-expand-md bg-info flex-grow-1">
			<div className="container">

					<button className="navbar-toggler navbar-toggler-right"
							type="button" data-toggle="collapse"
							data-target="#navbar2SupportedContent"
							aria-controls="navbar2SupportedContent"
							aria-expanded="true" aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="navbar-collapse text-center justify-content-between collapse show" id="navbar2SupportedContent">

						<ul className="navbar-nav">
							<small>&nbsp;</small>
						</ul>

						<a className="navbar-brand mx-auto" href="#">
							<span className="navbar-text d-flex justify-content-center">
								<b>Dynata Front Panel</b>
							</span>
						</a>

						<ul className="navbar-nav">
							<li className="nav-item">
								<a href="#" className="nav-link"
									onClick={this.handleLogoutClick}
								>
									Logout
								</a>
							</li>
						</ul>

					</div>

			</div>
		</nav>
	);
	}

}

export default Navbar;
