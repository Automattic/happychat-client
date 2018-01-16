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
const debug = debugFactory( 'happychat-client:api' );

/**
 * Internal dependencies
 */
import getUser from 'src/lib/wpcom/get-wpcom-user';
import Happychat from 'src/form';
import { MessageForm } from 'src/ui/components/message-form';
import reducer from 'src/state/reducer';
import { socketMiddleware } from 'src/state/middleware';
import { setCurrentUser, setGroups, setLocale } from 'src/state/user/actions';
import isChatBeingAssigned from 'src/state/selectors/is-chat-being-assigned';
import isChatAssigned from 'src/state/selectors/is-chat-assigned';
import isAvailable from 'src/state/selectors/is-available';
import { hasTouch } from 'src/lib/touch-detect';

/**
 * Subscribers object. Each key is an event exposed by the Happychat API.
 */
const subscribers = {
	availability: [],
	ongoingConversation: [],
};

const store = createStore(
	reducer,
	{},
	compose( applyMiddleware( socketMiddleware() ), devToolsEnhancer() )
);

/* eslint-disable camelcase */
const renderTo = ( { nodeId, user, howCanWeHelpOptions = [], howDoYouFeelOptions = [] } ) => {
	const { ID, email, username, display_name, avatar_URL, language, groups, accessToken } = user;
	store.dispatch( setCurrentUser( { ID, email, username, display_name, avatar_URL } ) );
	store.dispatch( setLocale( language ) );
	store.dispatch( setGroups( groups ) );

	// some CSS styles depend on theses classes
	if ( hasTouch() ) {
		document.getElementById( nodeId ).classList.add( 'touch' );
	} else {
		document.getElementById( nodeId ).classList.add( 'notouch' );
	}

	ReactDOM.render(
		<Provider store={ store }>
			<Happychat
				accessToken={ accessToken }
				howCanWeHelpOptions={ howCanWeHelpOptions }
				howDoYouFeelOptions={ howDoYouFeelOptions }
			/>
		</Provider>,
		document.getElementById( nodeId )
	);
};
/* eslint-enable camelcase */

const renderMessage = ( nodeId, msg ) =>
	ReactDOM.render( <MessageForm message={ msg } />, document.getElementById( nodeId ) );

const renderHappychat = ( { nodeId, howCanWeHelpOptions, howDoYouFeelOptions } ) => user =>
	renderTo( { nodeId, user, howCanWeHelpOptions, howDoYouFeelOptions } );

const renderError = nodeId => error => renderMessage( nodeId, 'Could not load form. ' + error );

/* eslint-disable camelcase */
const getWPComUser = groups => accessToken =>
	getUser(
		accessToken
	).then( ( { ID, email, username, display_name, avatar_URL, language } ) => ( {
		ID,
		email,
		username,
		display_name,
		avatar_URL,
		language,
		accessToken,
		groups,
	} ) );
/* eslint-enable camelcase */

/**
 * Renders a Happychat or Support form in the HTML Element provided by the nodeId.
 * If howCanWeHelpOptions option is present will render the Support form,
 * Happychat will be rendered otherwise.
 *
 * @param  {String} nodeId Mandatory. HTML Node id where Happychat will be rendered.
 * @param  {Array} groups Mandatory. Happychat groups this user belongs to.
 * @param  {String|Promise} accessToken Mandatory. A valid WP.com access token,
 *  					or a Promise that returns one.
 * @param  {Array} howCanWeHelpOptions Optional. If present will render the support form.
 * @param  {Array} howDoYouFeelOptions Optional.
 */
export const initHappychat = ( {
	nodeId,
	groups,
	accessToken,
	howCanWeHelpOptions,
	howDoYouFeelOptions,
} ) => {
	let getAccessToken = accessToken;
	if ( typeof accessToken === 'string' ) {
		getAccessToken = () => Promise.resolve( accessToken );
	}

	getAccessToken()
		.then( getWPComUser( groups ) )
		.then( renderHappychat( { nodeId, howCanWeHelpOptions, howDoYouFeelOptions } ) )
		.catch( renderError( nodeId ) );
};

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
	// Some clients hide the chat form status if the availability is false,
	// but they don't want to hide it if there is an ongoingConversation.
	//
	// When an operator has 1 spot left, we're going to call subscribers
	// with availability=false and ongoingConversation=true.
	// But because the availability event happens before the chatStatus is "assigned",
	// we need to consider the "assigning" chatStatus as an ongoingConversation,
	// to prevent the race condition.
	oldOngoingConversation = callSubscribersIfOngoingConversationChanged(
		oldOngoingConversation,
		isChatBeingAssigned( store.getState() ) || isChatAssigned( store.getState() )
	);
	oldAvailability = callSubscribersIfAvailabilityChanged(
		oldAvailability,
		isAvailable( store.getState() )
	);
} );

/**
 * Subscribe to Happychat events.
 *
 * @param  {String} eventName  Name of the Happychat event to subscribe.
 * @param  {Function} subscriber Callback function
 */
export const subscribeTo = ( eventName, subscriber ) => {
	subscribers.hasOwnProperty( eventName ) && subscribers[ eventName ].indexOf( subscriber ) === -1
		? subscribers[ eventName ].push( subscriber )
		: '';
};

/**
 * Subscribe from Happychat events.
 *
 * @param  {String} eventName  Name of the Happychat event to unsubscribe.
 * @param  {Function} subscriber Callback function
 */
export const unsubscribeFrom = ( eventName, subscriber ) => {
	subscribers.hasOwnProperty( eventName ) && subscribers[ eventName ].indexOf( subscriber ) > -1
		? subscribers[ eventName ].splice( subscribers[ eventName ].indexOf( subscriber ), 1 )
		: '';
};
