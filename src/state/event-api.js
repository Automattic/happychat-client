/** @format */

/**
 * Internal dependencies
 */
import { sendEvent, sendUserInfo } from './connection/actions';
import getChatStatus from './selectors/get-chat-status';
import getUserInfo from './selectors/get-user-info';
import isAvailable from './selectors/is-available';

const eventAPI = store => {
	const subscribers = {
		availability: [],
		chatStatus: [],
	};

	let oldAvailability = false;
	let oldChatStatus = 'new';
	store.subscribe( () => {
		const newAvailability = isAvailable( store.getState() );
		if ( newAvailability !== oldAvailability ) {
			oldAvailability = newAvailability;
			subscribers.availability.forEach( subscriber => subscriber( newAvailability ) );
		}

		const newChatStatus = getChatStatus( store.getState() );
		if ( newChatStatus !== oldChatStatus ) {
			oldChatStatus = newChatStatus;
			subscribers.chatStatus.forEach( subscriber => subscriber( newChatStatus ) );
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

	const sendEventMsg = msg => store.dispatch( sendEvent( msg ) );

	const sendUserInfoMsg = userInfo =>
		store.dispatch( sendUserInfo( getUserInfo( store.getState() )( userInfo ) ) );

	return {
		subscribeTo,
		unsubscribeFrom,
		sendEventMsg,
		sendUserInfoMsg,
	};
};

export default eventAPI;
