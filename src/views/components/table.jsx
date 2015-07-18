import React from 'react';

class TableRow extends React.Component {

    static propTypes = {
		data: React.PropTypes.object,
		action: React.PropTypes.func
	}

	render() {
		let data = this.props.data;

		let row = [];
		Object.keys(this.props.data).forEach((key) => {
			row.push(<td key={key}>{data[key]}</td>);
		});

		if (this.props.action) {
			return (
				<tr onClick={this.props.action.bind(null, data)}>{row}</tr>
			);
		}

		return <tr>{row}</tr>;
	}
}

export default class Table extends React.Component {

    static propTypes = {
		title: React.PropTypes.string,
		data: React.PropTypes.object,
		action: React.PropTypes.func
	}

	renderTableRows(data, action) {
		let rows = [];

		Object.keys(data).forEach((key) => {
			rows.push(<TableRow key={key} data={data[key]} action={action} />);
		})

		return rows;
	}

	render() {
		let title = this.props.title ? <h2>{this.props.title}</h2> : '';

		return (
			<div>
				{title}
				<table>
					<tbody>
						{ this.renderTableRows(this.props.data, this.props.action) }
					</tbody>
				</table>
			</div>
		);
	}
}
