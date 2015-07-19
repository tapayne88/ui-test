import React from 'react';
import {Link} from 'react-router';

export default class Nav extends React.Component {

	render() {
		return (
			<ul>
				<li><Link to="/">Home</Link></li>
			</ul>
		);
	}
}
