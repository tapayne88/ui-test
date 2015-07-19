import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import React from 'react';

import Main from './Main';
import BetSlip from './BetSlip';
import NotFound from './NotFound';

export default (
	<Route path="/">
		<DefaultRoute handler={Main} />
		<Route name="betslip" path="/betslip/:bet_id" handler={BetSlip} />
		<NotFoundRoute name="404" handler={NotFound} />
	</Route>
);
