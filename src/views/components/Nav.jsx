import React from 'react';
import InlineCss from 'react-inline-css';
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
			<InlineCss stylesheet={Nav.css()}>
				<div className="full-width">
					<ul className="inline-list">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/betslip">{ this.getBetslipTitle(this.props.betslipCount) }</Link></li>
					</ul>
				</div>
			</InlineCss>
		);
	}

	static css() {
		return `
			.inline-list {
				list-style-type: none;
				text-align: center;
				padding: 0;
			}

			.inline-list li {
				display: inline-block;
				padding: 0 5px;
			}
		`;
	}
}
