import express from 'express';
import React from 'react';
import Router from 'react-router';
import util from 'util';
import bunyan from 'bunyan';

import routes from './views/Routes';

let app = express();
let log = bunyan.createLogger({name: 'ISOBet'});

function getHtml() {
	return (`
		<!doctype html>
		<html>
			<head>
				<title>SkyBet - ISOSlip</title>
			</head>
			<body>%s</body>
		</html>
	`);
}

// Serve static stuff
app.use(express.static('static'));

// Ask react router to route
app.use((req, res, next) => {
	log.info('serving request [%s]', req.url);
	Router.run(routes, req.url, (Handler, router) => {
		let reactApp = React.renderToString(<Handler />);

		return res.send(util.format(getHtml(), reactApp));
	});
});

// Handle them 500's
app.use((err, req, res, next) => {
	log.error(err);
	let message = '<h1>Oh no! Something went gone wrong... sorry</h1>';
	return res.status(500).send(util.format(getHtml(), message));
});

let server = app.listen('3000', () => {
	let host = server.address().address;
	let port = server.address().port;

	log.info(`Server running at http://${host}:${port}`);
});
