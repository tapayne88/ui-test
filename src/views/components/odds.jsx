import React from 'react';

export default class Odds extends React.Component {

    static propTypes = {
		num: React.PropTypes.number,
		den: React.PropTypes.number,
		frac: React.PropTypes.bool
	}

	render() {
		if (this.props.num === this.props.den) {
			return (<span>evens</span>);
		}

		return (
			<span>{this.props.num}/{this.props.den}</span>
		);
	}
}
