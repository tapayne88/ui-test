import React from 'react';

import Header from './components/header';
import Slip from './components/slip';
import Odds from './components/odds';

import BetStore from '../stores/betStore';
import {placeBet} from '../actions';

export default class BetSlip extends React.Component {

	static propTypes = {
		initialStake: React.PropTypes.number
	}

	static defaultProps = {
		initialStake: 1
	};

	constructor(props) {
		super(props);

		this.getStore = props.context.getStore;
		this.executeAction = props.context.executeAction;

		this.bet_id = this.props.params.bet_id;

		this.state = Object.assign(
			{ stake: this.props.initialStake },
			this.getStateFromStore()
		);
	}

	componentDidMount() {
		this.getStore(BetStore).addChangeListener(() => { this.handleBetStoreChange() });
	}

	componentWillUnmount() {
		this.getStore(BetStore).removeChangeListener(() => { this.handleBetStoreChange() });
	}

	getStateFromStore() {
		let betStore = this.getStore(BetStore);
		let selection = betStore.getBet(this.bet_id);

		return {
			event: selection.event,
			name: selection.name,
			odds: selection.odds
		}
	}

	handleBetStoreChange() {
		this.setState(this.getStateFromStore());
	}

	updateStake(evt) {
		let val = parseInt(evt.target.value, 10) || 1;
		this.setState({stake: val});
	}

	placeBet() {
		this.executeAction(placeBet, {bet_id: this.bet_id, odds: this.state.odds, stake: this.state.stake});
	}

	render() {
		return (
			<div>
				<Header />
				<div>{this.state.event} - {this.state.name}</div>
				<Slip stake={this.state.stake} action={(evt) => { this.updateStake(evt) }} odds={this.state.odds}>
					<Odds num={this.state.odds.numerator} den={this.state.odds.denominator} frac={true} />
				</Slip>
				<button onClick={() => { this.placeBet() }}>Place bet</button>
			</div>
		);
	}
}
