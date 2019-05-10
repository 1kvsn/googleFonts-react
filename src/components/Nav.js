import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Nav() {
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
		</ul>
		

	)
}