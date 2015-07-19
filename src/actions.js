import superagent from 'superagent';

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
			if (err) return done(err);

			console.log(payload);
			console.log(res);
			return done();
		});
}
