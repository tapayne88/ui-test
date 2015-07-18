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
		data: React.PropTypes.array,
		action: React.PropTypes.func
	}

	render() {
		return (
			<table>
				<tbody>
					{ this.props.data.map((item) => {
						return <TableRow key={item.bet_id} data={item} action={this.props.action} />;
					}) }
				</tbody>
			</table>
		);
	}
}
