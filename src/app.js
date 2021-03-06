import React from 'react';
import Fluxible from 'fluxible';

import routes from './views/Routes';
import BetStore from './stores/betStore';

let app = new Fluxible({
	component: routes,
	stores: [
		BetStore
	]
});

export default app;
