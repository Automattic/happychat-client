/** @format */

/**
 * Internal dependencies
 */
import {
	sendEvent,
	sendMessage,
	sendPreferences,
	sendUserInfo,
} from 'src/state/connection/actions';
import { setChatStatus } from 'src/state/ui/actions';
import isChatFormOpen from 'src/state/selectors/is-chatform-open';
import getChatStatus from 'src/state/selectors/get-chat-status';
import isAvailable from 'src/state/selectors/is-available';
import getHappychatLastActivityTimestamp from 'src/state/selectors/get-chat-lastactivitytimestamp';
import getConnectionStatus from 'src/state/selectors/get-connection-status';
import { HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED } from 'src/state/constants';

const eventAPI = store => {
	const subscribers = {
		chatAvailability: [],
		chatStatus: [],
		chatPanelOpen: [],
		chatLastActivity: [],
		connectionStatus: [],
	};

	let oldChatActivity = Date.now();
	let oldChatOpenStatus = false;
	let oldAvailability = false;
	let oldChatStatus = 'new';
	let oldConnectionStatus = HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED;
	store.subscribe( () => {
		const state = store.getState();
		const newAvailability = isAvailable( state );
		if ( newAvailability !== oldAvailability ) {
			oldAvailability = newAvailability;
			subscribers.chatAvailability.forEach( subscriber => subscriber( newAvailability ) );
		}

		const newChatStatus = getChatStatus( state );
		if ( newChatStatus !== oldChatStatus ) {
			oldChatStatus = newChatStatus;
			subscribers.chatStatus.forEach( subscriber => subscriber( newChatStatus ) );
		}

		const newChatOpenStatus = isChatFormOpen( state );
		if ( newChatOpenStatus !== oldChatOpenStatus ) {
			oldChatOpenStatus = newChatOpenStatus;
			subscribers.chatPanelOpen.forEach(
				subscriber => subscriber( isChatFormOpen( state ) )
			);
		}

		const newConnectionStatus = getConnectionStatus( store.getState() );
		if ( newConnectionStatus !== oldConnectionStatus ) {
			oldConnectionStatus = newConnectionStatus;
			subscribers.connectionStatus.forEach( subscriber => subscriber( newConnectionStatus ) );
		}

		const newChatActivity = getHappychatLastActivityTimestamp( store.getState() );
		if ( newChatActivity !== oldChatActivity ) {
			oldChatActivity = newChatActivity;
			subscribers.chatLastActivity.forEach( subscriber => subscriber( newChatActivity ) );
		}
	} );

	const eventNameExist = eventName => subscribers.hasOwnProperty( eventName );

	const isSubscribed = ( eventName, subscriber ) =>
		subscribers[ eventName ].indexOf( subscriber ) > -1; // eslint-disable-line max-len

	const subscribeTo = ( eventName, subscriber ) =>
		eventNameExist( eventName ) &&
		! isSubscribed( eventName, subscriber ) &&
		subscribers[ eventName ].push( subscriber );

	const unsubscribeFrom = ( eventName, subscriber ) =>
		eventNameExist( eventName ) &&
		isSubscribed( subscriber, eventName ) &&
		subscribers[ eventName ].splice( subscribers[ eventName ].indexOf( subscriber ), 1 );

	const sendEventHandler = msg => store.dispatch( sendEvent( msg ) );
	const sendMessageHandler = ( msg, meta ) => store.dispatch( sendMessage( msg, meta ) );

	const updatePreferences = payload => store.dispatch( sendPreferences( payload ) );

	const sendUserInfoMsg = userInfo => store.dispatch( sendUserInfo( userInfo ) );

	const setChatOpen = ( status ) => store.dispatch( setChatStatus( status ) );

	return {
		subscribeTo,
		unsubscribeFrom,
		sendEventHandler,
		sendMessageHandler,
		sendUserInfoMsg,
		setChatOpen,
		updatePreferences,
	};
};

export default eventAPI;
