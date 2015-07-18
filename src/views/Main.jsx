import React from 'react';
import {Link} from 'react-router';

import Header from './components/header';
import Table from './components/table';

export default class Main extends React.Component {

	constructor(context) {
		super(context);

		this.betStore = context.context.getStore('BetStore');
		this.bets = this.betStore.getAll();
	}

	render() {
		return (
			<div>
				<Header />
				<Table data={this.bets} action={this.addToBetslip} />
			</div>
		);
	}

	addToBetslip(data) {
		console.log(`adding to betslip ${data.bet_id}`);
	}
}
