import React from 'react';
import {Link} from 'react-router';

export default class Nav extends React.Component {

    static propTypes = {
		betslipCount: React.PropTypes.number
	}

	static defaultProps = {
		betslipCount: 0
	}

	getBetslipTitle(count) {
		if (count < 1) {
			return 'Betslip';
		}

		return `Betslip (${count})`;
	}

	render() {
		return (
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/betslip">{ this.getBetslipTitle(this.props.betslipCount) }</Link></li>
			</ul>
		);
	}
}
