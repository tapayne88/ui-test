import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import React from 'react';

import Main from './Main';
import NotFound from './NotFound';

export default (
	<Route path="/">
		<DefaultRoute handler={Main} />
		<NotFoundRoute name="404" handler={NotFound} />
	</Route>
);
