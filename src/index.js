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
import isChatAssigned from 'src/state/selectors/is-chat-assigned';
import isAvailable from 'src/state/selectors/is-available';

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

const callSubscribersIfAvailabilityChanged = ( oldAvailability, newAvailability ) => {
	if ( oldAvailability !== newAvailability ) {
		debug( 'availability changed form ', oldAvailability, ' to ', newAvailability );
		subscribers.availability.forEach( subscriber => {
			subscriber( newAvailability );
		} );
	}
	return newAvailability;
};

const callSubscribersIfOngoingConversationChanged = ( oldStatus, newStatus ) => {
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
	// When an operator has 1 spot left and this is assigned to a new customer,
	// we're going to call both ongoingConversation and availability subscribers.
	//
	// Some clients use some logic to prevent the chat from showing if the availability
	// is false, but they don't hide the chat if there is an ongoingConversation;
	// hence, we need to call ongoingConversation subscribers first.
	oldOngoingConversation = callSubscribersIfOngoingConversationChanged(
		oldOngoingConversation,
		isChatAssigned( store.getState() )
	);
	oldAvailability = callSubscribersIfAvailabilityChanged(
		oldAvailability,
		isAvailable( store.getState() )
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
	subscribers.hasOwnProperty( eventName ) && subscribers[ eventName ].indexOf( subscriber ) === -1
		? subscribers[ eventName ].push( subscriber )
		: '';

export const unsubscribeFrom = ( eventName, subscriber ) =>
	subscribers.hasOwnProperty( eventName ) && subscribers[ eventName ].indexOf( subscriber ) > -1
		? subscribers[ eventName ].splice( subscribers[ eventName ].indexOf( subscriber ), 1 )
		: '';
