import React from 'react';
import InlineCss from 'react-inline-css';

import Header from './components/header';
import Table from './components/table';
import SelectionRow from './components/selectionRow';
import Nav from './components/nav';

import BetStore from '../stores/betStore';

import {toggleBetslip} from '../actions';

export default class Main extends React.Component {

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

		return {
			bets: betStore.getAll(),
			betslip: betStore.getBetslip()
		}
	}

	handleBetStoreChange = () => {
		this.setState(this.getStateFromStore());
	}

	toggleBetslip(bet_id) {
		this.context.executeAction(toggleBetslip, bet_id);
	}

	inBetslip(id) {
		return !!this.state.betslip[id];
	}

	renderSelections(data) {
		let selections = [];
		Object.keys(data).forEach((key) => {
			selections.push(
				<SelectionRow
					selected={this.inBetslip(key)}
					key={key}
					bet_id={key}
					data={data[key]}
					action={(bet_id) => { this.toggleBetslip(bet_id) }}
				/>
			);
		});

		return selections;
	}

	render() {
		return (
			<InlineCss stylesheet={Main.css()}>
				<div className="container centre typeface">
					<Header />
					<Nav betslipCount={Object.keys(this.state.betslip).length}/>
					<Table title="Avaliable Bets">
						{ this.renderSelections(this.state.bets) }
					</Table>
				</div>
			</InlineCss>
		);
	}

	static css() {
		return `
			.full-width {
				width: 100%;
			}

			.centre {
				margin: auto;
				display: block;
			}

			.typeface {
				font-family: Verdana, Arial, Helvetica, sans-serif;
			}

			.container {
				max-width: 500px;
			}
		`;
	}
}
