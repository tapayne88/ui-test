import React from 'react';

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
			content = <input type="number" value={this.props.stake} onChange={this.props.action} min="0.01" step="any" />;
		}

		return (
			<div>
				<span>{this.props.event} - {this.props.name}</span>
				<span>£{content}</span>
				<p>@ {this.renderOdds(this.props.odds)} could return £{retVal}</p>
				{ this.props.children }
			</div>
		);
	}

}
