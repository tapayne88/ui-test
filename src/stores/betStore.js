import BaseStore from 'dispatchr/addons/BaseStore';

export default class BetStore extends BaseStore {

	static storeName = 'BetStore';

	static handlers = {
		'RECEIVE_BETS': 'receiveBets',
		'BET_PLACE_SUCCESS': 'betPlaceSuccess',
		'BETSLIP_PLACE_SUCCESS': 'betSlipPlaceSuccess',
		'BETSLIP_PLACE_FAIL': 'betPlaceFail',
		'BET_PLACE_FAIL': 'betPlaceFail',
		'TOGGLE_BETSLIP': 'toggleBetslip'
	}

	constructor(dispatcher) {
		super(dispatcher);

		this.bets = {};
		this.receipt = {};
		this.betslip = [];
	}

	getAll() {
		return this.bets;
	}

	getBet(id) {
		return this.bets[id];
	}

	getBetslip() {
		let bs = {};

		this.betslip.forEach((item) => {
			bs[item] = this.bets[item];
		});

		return bs;
	}

	toggleBetslip(id) {
		if (this.betslip.indexOf(id) != -1) {
			this.betslip = this.betslip.filter((bet) => {
				return bet != id;
			});
		} else {
			this.betslip.push(id);
		}

		this.emitChange();
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

	betSlipPlaceSuccess(payload) {
		this.betslip = [];
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
