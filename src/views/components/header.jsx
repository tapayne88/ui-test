import React from 'react';
import InlineCss from 'react-inline-css';

export default class Header extends React.Component {
	render() {
		return (
			<InlineCss stylesheet={Header.css()} >
				<div className="full-width">
					<img className="centre" src="/sky-bet.png" alt="SkyBet" />
				</div>
			</InlineCss>
		);
	}

	static css() {
		return `
			.centre {
				margin: auto;
				display: block;
			}
		`;
	}
}
