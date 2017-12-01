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
import { HAPPYCHAT_CHAT_STATUS_ASSIGNED } from 'src/state/constants';
import Happychat from 'src/ui';
import reducer from 'src/state/reducer';
import { socketMiddleware } from 'src/state/middleware';
import { setCurrentUser, setGroups, setLocale } from 'src/state/user/actions';
const debug = debugFactory( 'happychat-client:api' );

const subscribers = {
	availability: [],
	ongoingConversation: [],
};

const store = createStore(
	reducer,
	{},
	compose( applyMiddleware( socketMiddleware() ), devToolsEnhancer() )
);

const maybeTellAvailabilitySubscribers = ( oldAvailability, newAvailability ) => {
	if ( oldAvailability !== newAvailability ) {
		debug( 'availability changed form ', oldAvailability, ' to ', newAvailability );
		subscribers.availability.forEach( subscriber => {
			subscriber( newAvailability );
		} );
	}
	return newAvailability;
};

const maybeTellOngoingConversationSubscribers = ( oldStatus, newStatus ) => {
	if ( oldStatus !== newStatus ) {
		debug( 'ongoingConversation changed form ', oldStatus, ' to ', newStatus );
		subscribers.ongoingConversation.forEach( subscriber => {
			subscriber( newStatus );
		} );
	}
	return newStatus;
};

let oldAvailability = false;
let oldOngoingConversation = false;
store.subscribe( () => {
	// we need to notify first the ongoingConversation subscribers
	oldOngoingConversation = maybeTellOngoingConversationSubscribers(
		oldOngoingConversation,
		store.getState().chat.status === HAPPYCHAT_CHAT_STATUS_ASSIGNED
	);
	oldAvailability = maybeTellAvailabilitySubscribers(
		oldAvailability,
		store.getState().connection.isAvailable
	);
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

export const subscribeTo = ( eventName, subscriber ) =>
	subscribers.hasOwnProperty( eventName ) ? subscribers[ eventName ].push( subscriber ) : '';
