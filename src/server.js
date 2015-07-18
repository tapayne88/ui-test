import express from 'express';
import React from 'react';
import Router from 'react-router';
import util from 'util';
import bunyan from 'bunyan';
import {FluxibleComponent} from 'fluxible-addons-react';
import dispatchr from 'dispatchr';

import BetStore from './stores/betStore';
import showBets from './actions/showBets';
import app from './app';

let server = express();
let log = bunyan.createLogger({name: 'ISOBet'});

function getHtml() {
	return (`
		<!doctype html>
		<html>
			<head>
				<title>SkyBet - ISOSlip</title>
			</head>
			<body>
				<div id="react-root">%s</div>
				<script src="/dist/client.js"></script>
			</body>
		</html>
	`);
}

// Serve static stuff
server.use(express.static('static'));

// Ask react router to route
server.use((req, res, next) => {
	log.info('serving request [%s]', req.url);

	let dispatcher = dispatchr.createDispatcher({
		stores: [ BetStore ]
	});
	let context = app.createContext();

	Router.run(app.getComponent(), req.url, (Handler, router) => {
		context.executeAction(showBets, {}, (err) => {
			if (err) return next(err);

			let reactApp = React.renderToString(
				React.createElement(
					FluxibleComponent,
					{ context: context.getComponentContext() },
					<Handler />
				)
			);

			return res.send(util.format(getHtml(), reactApp));
		});
	});
});

// Handle them 500's
server.use((err, req, res, next) => {
	log.error(err);
	let message = '<h1>Oh no! Something went gone wrong... sorry</h1>';
	return res.status(500).send(util.format(getHtml(), message));
});

let serverInfo = server.listen('3000', () => {
	let host = serverInfo.address().address;
	let port = serverInfo.address().port;

	log.info(`Server running at http://${host}:${port}`);
});
