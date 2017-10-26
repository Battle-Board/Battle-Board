import React from 'react'
import { Link } from 'react-router-dom'
import './TopNav.css';
import logo from '../../Battle-Board.png';

// The Header creates links that can be used to navigate
// between routes.
const TopNav = () => (

	<div className="TopNav">
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-6">
					<img src={logo} alt="Battle Board Logo"/>
				</div>
				<div className="col-sm-6 text-right">
					<Link to='/'>Home</Link>
		 			&nbsp; | &nbsp;
		 			<Link to="/LogReg"><a>Login</a></Link>
				</div>
			</div>
		</div>
	</div>

)

export default TopNav