/** @format */

/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

/**
 * Internal dependencies
 */
import Happychat from 'src/ui';
import reducer from 'src/state/reducer';
import { socketMiddleware } from 'src/state/middleware';
import { setCurrentUser, setGroups, setLocale } from 'src/state/user/actions';

const store = createStore(
	reducer,
	{},
	compose( applyMiddleware( socketMiddleware() ), devToolsEnhancer() )
);

/* eslint-disable camelcase */
export const renderTo = (
	nodeId,
	{ ID, email, username, display_name, avatar_URL, language, groups },
	accessToken
) => {
	store.dispatch( setCurrentUser( { ID, email, username, display_name, avatar_URL } ) );
	store.dispatch( setLocale( language ) );
	store.dispatch( setGroups( groups ) );

	ReactDOM.render(
		<Provider store={ store }>
			<Happychat accessToken={ accessToken } />
		</Provider>,
		document.getElementById( nodeId )
	);
};
/* eslint-enable camelcase */
