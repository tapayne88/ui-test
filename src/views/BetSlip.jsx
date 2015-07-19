import React from 'react';

import Header from './components/header';
import Nav from './components/Nav';
import Selection from './components/selection';

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

	renderReceipt(state) {
		let message = '';
		if (state.receipt.error) {
			message = (<p>Bet placement failed: {state.receipt.error}</p>);
		} else {
			message = (<p>Bet Placed<br />Your Reference: {state.receipt.transaction_id}</p>);
		}

		return (
			<div>
				<Selection
					odds={state.odds}
					stake={state.stake}
					event={state.event}
					name={state.name}
				/>
				{message}
			</div>
		);
	}

	renderSlip(state) {
		return (
			<div>
				<Selection
					odds={state.odds}
					stake={state.stake}
					event={state.event}
					name={state.name}
					action={(evt) => { this.updateStake(evt) }}
				/>
				<button onClick={() => { this.placeBet() }}>Place bet</button>
			</div>
		);
	}

	render() {
		let child = '';
		if (this.state.receipt) {
			child = this.renderReceipt(this.state);
		} else {
			child = this.renderSlip(this.state);
		}

		return (
			<div>
				<Header />
				<Nav />
				{ child }
			</div>
		);
	}
}
