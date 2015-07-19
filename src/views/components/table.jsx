import React from 'react';

export default class Table extends React.Component {

    static propTypes = {
		title: React.PropTypes.string,
		children: React.PropTypes.array.isRequired
	}

	render() {
		let title = this.props.title ? <h2>{this.props.title}</h2> : '';

		return (
			<div>
				{title}
				<table>
					<tbody>
						{ this.props.children }
					</tbody>
				</table>
			</div>
		);
	}
}
