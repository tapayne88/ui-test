import React from 'react';

class TableRow extends React.Component {

    static propTypes = {
		data: React.PropTypes.object,
		action: React.PropTypes.func
	}

	render() {
		let data = this.props.data;

		let tds = [];
		Object.keys(this.props.data).forEach((key) => {
			tds.push(<td key={key}>{data[key]}</td>);
		});
		let row = <tr>{tds}</tr>;

		if (this.props.action) {
			return (
				<a onClick={this.props.action.bind(null, data)}>{row}</a>
			);
		}

		return row;
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
