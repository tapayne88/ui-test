import React from 'react';
import Router from 'react-router';
import {FluxibleComponent} from 'fluxible-addons-react';

import app from './app';

app.rehydrate(window.App, (err, context) => {
	if (err) throw err;

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
});
