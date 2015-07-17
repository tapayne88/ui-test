import React from 'react';
import Router from 'react-router';
import {provideContext} from 'fluxible-addons-react';

import app from './app';

let context = app.createContext();

Router.run(app.getComponent(), Router.HistoryLocation, (Handler) => {
	let rootComponent = provideContext(Handler);

	React.render(
		React.createElement(rootComponent, {context: context.getComponentContext()}),
		document.getElementById('react-root')
	);
});
