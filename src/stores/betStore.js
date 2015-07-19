import BaseStore from 'dispatchr/addons/BaseStore';

export default class BetStore extends BaseStore {

	static storeName = 'BetStore';

	static handlers = {
		'RECEIVE_BETS': 'receiveBets',
		'BET_PLACE_SUCCESS': 'betPlaceSuccess',
		'BET_PLACE_FAIL': 'betPlaceFail'
	}

	constructor(dispatcher) {
		super(dispatcher);

		this.bets = {};
		this.receipt = {};
	}

	getAll() {
		return this.bets;
	}

	getBet(id) {
		return this.bets[id];
	}

	getReceipt() {
		let receipt = this.receipt;
		this.receipt = {};

		if (Object.getOwnPropertyNames(receipt).length === 0) {
			return false;
		}

		return receipt;
	}

	betPlaceSuccess(payload) {
		this.receipt = payload;
		this.emitChange();
	}

	betPlaceFail(payload) {
		this.receipt = payload;
		this.emitChange();
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
