import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
	<CookiesProvider>
		<div>APP</div>
	</ CookiesProvider>,
	document.getElementById('app')
);
