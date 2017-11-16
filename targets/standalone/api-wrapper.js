/** @format */

/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import debugFactory from 'debug';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

/**
 * Calypso dependencies
 */
import middleware from 'state/happychat/middleware';

/**
 * Internal dependencies
 */
import Happychat from 'src/ui';
import reducer from 'src/state/reducer';
import { openChat } from 'src/state/ui/actions';
import { setCurrentUser, setLocale } from 'src/state/user/actions';
import { getUser } from 'src/lib/wp';

const debug = debugFactory( 'happychat-embedded:api-wrapper' );

debug( 'createStore' );
const store = createStore(
	reducer,
	{},
	compose( applyMiddleware( middleware() ), devToolsEnhancer() )
);

const renderTo = nodeId => {
	debug( 'get user info' );
	/* eslint-disable camelcase */
	getUser()
		.then( ( { ID, email, username, display_name, avatar_URL, language } ) => {
			store.dispatch( setCurrentUser( { ID, email, username, display_name, avatar_URL } ) );
			store.dispatch( setLocale( language ) );

			debug( 'renderTo' );
			ReactDOM.render(
				<Provider store={ store }>
					<Happychat />
				</Provider>,
				document.getElementById( nodeId )
			);

			debug( 'dispatch openChat' );
			store.dispatch( openChat() );
		} )
		.catch( error => {
			debug( error );
		} );
	/* eslint-enable camelcase */
};

export { renderTo };
