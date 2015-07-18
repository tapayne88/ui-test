import BaseStore from 'dispatchr/addons/BaseStore';

export default class BetStore extends BaseStore {

	static storeName = 'BetStore';

	static handlers = {
		'RECEIVE_BETS': 'receiveBets'
	}

	constructor(dispatcher) {
		super(dispatcher);

		this.bets = {};
	}

	getAll() {
		return this.bets;
	}

	receiveBets(payload) {
		this.bets = this.mergeBets(this.bets, payload);
		this.emitChange();
	}

	mergeBets(bets, data) {
		data.forEach((item) => {
			bets[item.bet_id] = item;
		});

		return bets
	}

	dehydrate() {
		return {
			bets: this.bets
		}
	}

	rehydrate(state) {
		this.bets = state.bets;
	}
}
