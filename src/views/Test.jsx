import React from 'react';
import {Link} from 'react-router';

export default class Test extends React.Component {
	render() {
		return (
			<div>
				<h1>Test</h1>
				<Link to="/">Home</Link>
			</div>
		);
	}
}
