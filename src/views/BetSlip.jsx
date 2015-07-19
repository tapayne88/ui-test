import React from 'react';

import Header from './components/header';
import Nav from './components/Nav';
import Slip from './components/slip';
import Receipt from './components/receipt';
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

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	}

	constructor(props, context) {
		super(props, context);

		this.state = Object.assign(
			{
				bet_id: this.props.params.bet_id,
				stake: this.props.initialStake
			},
			this.getStateFromStore()
		);
	}

	componentDidMount() {
		this.context.getStore(BetStore).addChangeListener(this.handleBetStoreChange);
	}

	componentWillUnmount() {
		this.context.getStore(BetStore).removeChangeListener(this.handleBetStoreChange);
	}

	getStateFromStore() {
		let betStore = this.context.getStore(BetStore);
		let selection = betStore.getBet(this.props.params.bet_id);
		let receipt = betStore.getReceipt(this.props.params.bet_id);

		return {
			event: selection.event,
			name: selection.name,
			odds: selection.odds,
			receipt: receipt,
			showReceipt: receipt !== false
		}
	}

	handleBetStoreChange = () => {
		this.setState(this.getStateFromStore());
	}

	updateStake(evt) {
		let val = parseInt(evt.target.value, 10) || 1;
		this.setState({stake: val});
	}

	placeBet() {
		this.context.executeAction(placeBet, {bet_id: this.state.bet_id, odds: this.state.odds, stake: this.state.stake});
	}

	render() {
		let child = '';
		if (this.state.receipt) {
			child = (
				<Receipt stake={this.state.stake} odds={this.state.odds} receipt={this.state.receipt} >
					<Odds num={this.state.odds.numerator} den={this.state.odds.denominator} frac={true} />
				</Receipt>
			);
		} else {
			child = (
				<div>
				<Slip stake={this.state.stake} action={(evt) => { this.updateStake(evt) }} odds={this.state.odds}>
					<Odds num={this.state.odds.numerator} den={this.state.odds.denominator} frac={true} />
				</Slip>
				<button onClick={() => { this.placeBet() }}>Place bet</button>
				</div>
			);
		}
		return (
			<div>
				<Header />
				<Nav />
				<span>{this.state.event} - {this.state.name}</span>
				{ child }
			</div>
		);
	}
}
