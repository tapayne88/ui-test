import React from 'react';
import {Link} from 'react-router';

import Odds from './odds';

export default class SelectionRow extends React.Component {

    static propTypes = {
		bet_id: React.PropTypes.string,
		data: React.PropTypes.object,
		action: React.PropTypes.func,
		selected: React.PropTypes.bool
	}

	render() {
		let data = this.props.data;

		let row = ['event', 'name', 'odds'].map((key) => {
			let content = data[key];

			if (key === 'odds') {
				content = <Odds num={content.numerator} den={content.denominator} frac={true} />;
			}

			return (<td key={key} onClick={() => { this.props.action(this.props.bet_id) }}>{content}</td>);
		});

		return <tr className={this.getClassName(this.props.selected)}>{row}</tr>;
	}

	getClassName(selected) {
		if (selected) {
			return 'selected';
		}
		return '';
	}
}

