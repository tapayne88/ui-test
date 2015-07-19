import React from 'react';
import {Link} from 'react-router';

import Odds from './odds';

export default class SelectionRow extends React.Component {

    static propTypes = {
		bet_id: React.PropTypes.string,
		data: React.PropTypes.object
	}

	render() {
		let data = this.props.data;

		let row = [];
		Object.keys(data).forEach((key) => {
			let content = data[key];

			if (key === 'odds') {
				content = <Link to="betslip" params={{bet_id: this.props.bet_id}}>
					<Odds num={content.numerator} den={content.denominator} frac={true} />
				</Link>;
			}

			row.push(<td key={key}>{content}</td>);
		});

		return <tr>{row}</tr>;
	}
}

