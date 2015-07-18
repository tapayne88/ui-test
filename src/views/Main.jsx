import React from 'react';
import {Link} from 'react-router';

import Header from './components/header';
import Table from './components/table';

import BetStore from '../stores/betStore';
import {showBets} from '../actions';

export default class Main extends React.Component {

	constructor(props) {
		super(props);

		this.getStore = props.context.getStore;
		this.executeAction = props.context.executeAction;

		this.state = this.getStateFromStore();
	}

	componentDidMount() {
		this.getStore(BetStore).addChangeListener(() => { this.handleBetStoreChange() });
	}

	componentWillUnmount() {
		this.getStore(BetStore).removeChangeListener(() => { this.handleBetStoreChange() });
	}

	getStateFromStore() {
		let betStore = this.getStore(BetStore);

		return {
			bets: betStore.getAll()
		}
	}

	handleBetStoreChange() {
		this.setState(this.getStateFromStore());
	}

	render() {
		return (
			<div>
				<Header />
				<Table data={this.state.bets} action={(data) => { this.addToBetslip(data) }} />
			</div>
		);
	}

	addToBetslip(data) {
		this.executeAction(showBets);
		console.log(`adding to betslip ${data.bet_id}`);
	}
}
