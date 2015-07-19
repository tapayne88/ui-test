import React from 'react';

import Header from './components/header';
import Nav from './components/nav';
import Selection from './components/selection';

import BetStore from '../stores/betStore';
import {placeBets} from '../actions';

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

		this.state = this.getStateFromStore();
	}

	componentDidMount() {
		this.context.getStore(BetStore).addChangeListener(this.handleBetStoreChange);
	}

	componentWillUnmount() {
		this.context.getStore(BetStore).removeChangeListener(this.handleBetStoreChange);
	}

	getStateFromStore() {
		let betStore = this.context.getStore(BetStore);

		let selections = this.getInitialSelections(betStore.getBetslip());
		let receipt = betStore.getReceipt();

		return {
			selections: selections,
			receipt: receipt,
			showReceipt: receipt !== false
		}
	}

	getInitialSelections(sels) {
		let newSels = {};

		Object.keys(sels).forEach((key) => {
			let sel = sels[key];
			sel.stake = this.props.initialStake

			newSels[key] = sel;
		});

		return newSels;
	}

	handleBetStoreChange = () => {
		this.setState(this.getStateFromStore());
	}

	updateStake(evt, bet_id) {
		let val = parseInt(evt.target.value, 10) || 1;
		let selections = this.state.selections;
		selections[bet_id].stake = val;

		this.setState({selections: selections});
	}

	placeBets() {
		this.context.executeAction(placeBets, this.state.selections);
	}

	renderReceipt(state) {
		return (
			<div>
				{ Object.keys(this.state.receipt).map((key) => {
					let item = this.state.receipt[key];

					let message = '';
					if (item.error) {
						message = (<p>Bet placement failed: {item.error}</p>);
					} else {
						message = (<p>Bet Placed<br />Your Reference: {item.transaction_id}</p>);
					}

					return (<Selection
						key={item.bet_id}
						odds={item.odds}
						stake={item.stake}
						event={item.event}
						name={item.name}
					>
						{message}
					</Selection>);
				}) }
			</div>
		);
	}

	renderSlip(state) {
		let subSection = <p>Betslip empty</p>
		if (Object.keys(this.state.selections).length > 0) {
			subSection = <button onClick={() => { this.placeBets() }}>Place bet</button>;
		}

		return (
			<div>
				{ Object.keys(this.state.selections).map((key) => {
					let item = this.state.selections[key];
					return (<Selection
						key={item.bet_id}
						odds={item.odds}
						stake={item.stake}
						event={item.event}
						name={item.name}
						action={(evt) => { this.updateStake(evt, item.bet_id) }}
					/>);
				}) }
				{subSection}
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
				<Nav betslipCount={Object.keys(this.state.selections).length}/>
				{ child }
			</div>
		);
	}
}
