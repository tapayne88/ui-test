import React from 'react';

import Header from './components/header';
import Table from './components/table';
import SelectionRow from './components/selectionRow';

import BetStore from '../stores/betStore';

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

	renderSelections(data) {
		let selections = [];
		Object.keys(data).forEach((key) => {
			selections.push(<SelectionRow key={key} bet_id={key} data={data[key]} />);
		});

		return selections;
	}

	render() {
		return (
			<div>
				<Header />
				<Table title="Avaliable Bets">
					{ this.renderSelections(this.state.bets) }
				</Table>
			</div>
		);
	}
}
