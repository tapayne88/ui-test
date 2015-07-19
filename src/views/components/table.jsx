import React from 'react';
import InlineCss from 'react-inline-css';

export default class Table extends React.Component {

    static propTypes = {
		title: React.PropTypes.string,
		children: React.PropTypes.array.isRequired
	}

	render() {
		let title = this.props.title ? <h2>{this.props.title}</h2> : '';

		return (
			<InlineCss stylesheet={Table.css()}>
				<div className="centre">
					{title}
					<table className="full-width">
						<tbody>
							{ this.props.children }
						</tbody>
					</table>
				</div>
			</InlineCss>
		);
	}

	static css() {
		return `
			table {
				border-collapse: collapse;
			}

			table, th, td {
				border: 1px solid black;
			}

			td {
				padding: 5px;
			}

			tr {
				cursor: pointer;
			}
		`;
	}
}
