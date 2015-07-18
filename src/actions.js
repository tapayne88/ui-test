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
