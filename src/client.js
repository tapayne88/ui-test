import React from 'react';
import Router from 'react-router';
import dispatchr from 'dispatchr';
import {FluxibleComponent} from 'fluxible-addons-react';

import BetStore from './stores/betStore';
import app from './app';

let context = app.createContext();

Router.run(app.getComponent(), Router.HistoryLocation, (Handler) => {
	React.render(
		React.createElement(
			FluxibleComponent,
			{ context: context.getComponentContext() },
			<Handler />
		),
		document.getElementById('react-root')
	);
});
