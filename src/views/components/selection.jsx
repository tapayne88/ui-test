import React from 'react';
import InlineCss from 'react-inline-css';

import Odds from './odds';

export default class Selection extends React.Component {

	static propTypes = {
		odds: React.PropTypes.object,
		stake: React.PropTypes.number,
		event: React.PropTypes.string,
		name: React.PropTypes.string,
		action: React.PropTypes.func,
		children: React.PropTypes.element
	}

	getReturnValue(odds, stake) {
		return stake + (stake * (odds.numerator / odds.denominator));
	}

	renderOdds(odds) {
		return <Odds num={odds.numerator} den={odds.denominator} frac={true} />;
	}

	render() {
		let retVal = this.getReturnValue(this.props.odds, this.props.stake);
		let content = this.props.stake;

		if (this.props.action) {
			content = <input className="inline-input" type="number" value={this.props.stake} onChange={this.props.action} min="0.01" step="any" />;
		}

		return (
			<InlineCss stylesheet={Selection.css()}>
				<div className="border-thin">
					<p>{this.props.event} - {this.props.name}</p>
					<p><span className="push-right">£{content}</span><span>@ {this.renderOdds(this.props.odds)} could return £{retVal}</span></p>
					{ this.props.children }
				</div>
			</InlineCss>
		);
	}

	static css() {
		return `
			.inline-input {
				display: inline-block;
				font-size: 16px;
				width: 50px;
			}

			.push-right {
				margin-right: 5px;
			}

			.border-thin {
				border: 1px solid black;
				margin-bottom: 2px;
			}
		`;
	}

}
