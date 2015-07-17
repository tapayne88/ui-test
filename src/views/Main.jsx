import React from 'react';
import {Link} from 'react-router';

import Header from './components/header';
import Table from './components/table';

let data = [
{ "bet_id": 1, "event": "World Cup 2018", "name": "England", "odds": { "numerator": 10, "denominator": 1 } },
{ "bet_id": 2, "event": "World Cup 2018", "name": "Brazil", "odds": { "numerator": 1, "denominator": 1 } },
{ "bet_id": 3, "event": "World Cup 2018", "name": "Spain", "odds": { "numerator": 3, "denominator": 1 } },
{ "bet_id": 4, "event": "Next General Election", "name": "Labour", "odds": { "numerator": 7, "denominator": 4 } },
{ "bet_id": 5, "event": "Next General Election", "name": "Conservatives", "odds": { "numerator": 2, "denominator": 1 } },
{ "bet_id": 6, "event": "Next General Election", "name": "Liberal Democrats", "odds": { "numerator": 17, "denominator": 1 } }
];

export default class Main extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Table data={data} action={this.addToBetslip} />
			</div>
		);
	}

	addToBetslip(data) {
		console.log(`adding to betslip ${data.bet_id}`);
	}
}
