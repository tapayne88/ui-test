import React from 'react';

import Header from './components/header';
import Table from './components/table';

export default class HTMLComponent extends React.Component {

	static propTypes = {
		title: React.PropTypes.string.isRequired,
		markup: React.PropTypes.string.isRequired,
		client: React.PropTypes.string.isRequired
	}

	render() {
		return (
			<html>
				<head>
					<title>{this.props.title}</title>
				</head>
				<body>
					<div id="react-root" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
					<script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
					<script src={this.props.client} defer></script>
				</body>
			</html>
		);
	}
}
