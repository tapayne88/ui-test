import React from 'react';

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
						return this.getRow(item, this.props.action);
					}) }
				</tbody>
			</table>
		);
	}

	getRow(data, action) {
		let tds = [];
		Object.keys(data).forEach((key) => {
			tds.push(<td>{data[key]}</td>);
		});
		let row = <tr key={data.bet_id}>{tds}</tr>;

		if (action) {
			return (
				<a onClick={action.bind(null, data)}>{row}</a>
			);
		}

		return row;
	}
}
