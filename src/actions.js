import superagent from 'superagent';
import async from 'async';

export function showBets(actionContext, payload, done) {
	superagent
		.get('http://skybettechtestapi.herokuapp.com/available')
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (err) return done(err);

			actionContext.dispatch('RECEIVE_BETS', res.body);
			return done();
		});
}

export function placeBet(actionContext, payload, done) {
	superagent
		.post('http://skybettechtestapi.herokuapp.com/bets')
		.set('Content-Type', 'application/json')
		.send(payload)
		.end((err, res) => {
			if (err) {
				return actionContext.dispatch('BET_PLACE_FAIL', res.body);
			}

			return actionContext.dispatch('BET_PLACE_SUCCESS', res.body);
		});
}

export function placeBets(actionContext, payload, done) {
	let data = {};

	async.forEachOf(payload, (bet, key, done) => {
		superagent
			.post('http://skybettechtestapi.herokuapp.com/bets')
			.set('Content-Type', 'application/json')
			.send(bet)
			.end((err, res) => {
				if (err) {
					data[bet.bet_id] = Object.assign(
						bet,
						res.body
					);
				} else {
					data[bet.bet_id] = res.body;
				}
				return done();
			});
	}, (err) => {
		return actionContext.dispatch('BETSLIP_PLACE_SUCCESS', data);
	});
}

export function addToBetslip(actionContext, payload, done) {
	return actionContext.dispatch('ADD_TO_BETSLIP', payload);
}
