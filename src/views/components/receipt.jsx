import React from 'react';

export default class Receipt extends React.Component {

    static propTypes = {
		stake: React.PropTypes.number,
		odds: React.PropTypes.object,
		receipt: React.PropTypes.object,
		children: React.PropTypes.element.isRequired
	}

	renderMessage(data) {
		if (data.error) {
			return (<p>Bet placement failed: {data.error}</p>);
		}
		return (<p>Bet Place<br />Your Reference: {data.transaction_id}</p>);
	}

	render() {
		let retVal = this.props.stake + (this.props.stake * (this.props.odds.numerator / this.props.odds.denominator));

		return (
			<div>
				<span>£{this.props.stake}</span>
				<p>@ {this.props.children} could return £{retVal}</p>
				<p>{this.renderMessage(this.props.receipt)}</p>
			</div>
		);
	}
}
