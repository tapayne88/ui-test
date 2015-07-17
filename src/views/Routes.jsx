import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import React from 'react';

import Main from './Main';
import Test from './Test';
import NotFound from './NotFound';

export default (
	<Route path="/">
		<DefaultRoute handler={Main} />
		<Route path="/test" handler={Test} />
		<NotFoundRoute name="404" handler={NotFound} />
	</Route>
);
