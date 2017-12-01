/** @format */

/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import debugFactory from 'debug';
/**
 * Internal dependencies
 */
import Happychat from 'src/ui';
import reducer from 'src/state/reducer';
import { socketMiddleware } from 'src/state/middleware';
import { setCurrentUser, setGroups, setLocale } from 'src/state/user/actions';
const debug = debugFactory( 'happychat-client:api' );

const subscribers = {
	availability: [],
};

const store = createStore(
	reducer,
	{},
	compose( applyMiddleware( socketMiddleware() ), devToolsEnhancer() )
);

let oldAvailability = store.getState().connection.isAvailable;
store.subscribe( () => {
	const newAvailability = store.getState().connection.isAvailable;
	if ( oldAvailability !== newAvailability ) {
		debug( 'availability changed from ', oldAvailability, ' to ', newAvailability );
		subscribers.availability.forEach( subscriber => {
			subscriber( newAvailability );
		} );
	}
	oldAvailability = newAvailability;
} );

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

export const subscribeTo = ( eventName, subscriber ) => {
	const subsFiltered = subscribers[ eventName ] || [];
	subsFiltered.push( subscriber );
};
