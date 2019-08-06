import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class Nav extends Component {
	
	render() {
		return (
			<ul className="nav">
				<li>
					<NavLink exact activeClassName = 'active' to='/' >
						<button>1</button>
					</NavLink>
				</li>
				<li>
					<NavLink exact activeClassName = 'active' to='/2' >
						<button>2</button>
					</NavLink>
				</li>
				<li>
					<NavLink exact activeClassName = 'active' to='/3' >
						<button>3</button>
					</NavLink>
				</li>
			</ul>
		)
	}
}