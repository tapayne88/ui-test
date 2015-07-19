import React from 'react';

export default class Slip extends React.Component {

    static propTypes = {
		stake: React.PropTypes.number,
		odds: React.PropTypes.object,
		action: React.PropTypes.func,
		children: React.PropTypes.element.isRequired
	}

	render() {
		let retVal = this.props.stake + (this.props.stake * (this.props.odds.numerator / this.props.odds.denominator));

		return (
			<div>
				<span>£<input type="number" value={this.props.stake} onChange={this.props.action} min="0.01" step="any" /></span>
				<p>@ {this.props.children} could return £{retVal}</p>
			</div>
		);
	}
}
